const {
  JobState,
  JobType,
  EnterpriseJob,
  JobRegistry,
  EnterpriseScheduler,
  createEnterpriseScheduler,
  enterpriseSchedulerMiddleware,
  JobRegistrationError,
  JobNotFoundError,
  JobExecutionError,
} = require('../../../../src/enterprise/scheduler');

const core = require('../../../../packages/core/src');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

class VerificationJob extends EnterpriseJob {
  constructor() {
    super({
      name: 'verification.job',
      type: JobType.MANUAL,
      metadata: {
        purpose: 'scheduler verification',
      },
    });
  }

  async execute(context, input) {
    return {
      jobName: context.jobName,
      value: input.value,
      ok: true,
    };
  }
}

class FailingJob extends EnterpriseJob {
  constructor() {
    super({
      name: 'failing.job',
      type: JobType.MANUAL,
    });
  }

  async execute() {
    throw new Error('expected job failure');
  }
}

async function run() {
  const registry = new JobRegistry();

  const scheduler = createEnterpriseScheduler({
    registry,
    container: { name: 'test.container' },
    configuration: { name: 'test.configuration' },
    repositories: { name: 'test.repositories' },
    compositionRoot: { name: 'test.composition' },
  });

  assert(scheduler instanceof EnterpriseScheduler, 'scheduler factory invalid');

  const job = new VerificationJob();
  const registered = scheduler.register(job);

  assert(registered.name === 'verification.job', 'job registration name mismatch');
  assert(registered.type === JobType.MANUAL, 'job registration type mismatch');
  assert(registered.state === JobState.REGISTERED, 'job initial state invalid');
  assert(Object.isFrozen(registered), 'job registration record should be frozen');

  assert(scheduler.has('verification.job') === true, 'scheduler has failed');
  assert(scheduler.get('verification.job').name === 'verification.job', 'scheduler get failed');
  assert(scheduler.list().length === 1, 'scheduler list count mismatch');

  const scheduled = scheduler.schedule('verification.job');

  assert(scheduled.state === JobState.SCHEDULED, 'job schedule failed');

  const result = await scheduler.run('verification.job', {
    value: 42,
  });

  assert(result.ok === true, 'job run result not ok');
  assert(result.job === 'verification.job', 'job run name mismatch');
  assert(result.state === JobState.COMPLETED, 'job final state mismatch');
  assert(result.result.value === 42, 'job input/result mismatch');
  assert(Object.isFrozen(result), 'job run result should be frozen');

  try {
    await scheduler.run('verification.job');
    throw new Error('completed job should not run again');
  } catch (error) {
    assert(error instanceof JobExecutionError, 'wrong completed rerun error');
  }

  scheduler.register(new FailingJob());

  try {
    await scheduler.run('failing.job');
    throw new Error('failing job should throw');
  } catch (error) {
    assert(error instanceof JobExecutionError, 'wrong failing job error');
  }

  assert(scheduler.get('failing.job').state === JobState.FAILED, 'failing job state mismatch');

  try {
    scheduler.register(new VerificationJob());
    throw new Error('duplicate job should fail');
  } catch (error) {
    assert(error instanceof JobRegistrationError, 'wrong duplicate job error');
  }

  try {
    scheduler.get('missing.job');
    throw new Error('missing job should fail');
  } catch (error) {
    assert(error instanceof JobNotFoundError, 'wrong missing job error');
  }

  const cancelJob = new class extends EnterpriseJob {
    constructor() {
      super({
        name: 'cancel.job',
        type: JobType.DELAYED,
      });
    }

    async execute() {
      return true;
    }
  }();

  scheduler.register(cancelJob);
  scheduler.schedule('cancel.job');

  const cancelled = scheduler.cancel('cancel.job');

  assert(cancelled.state === JobState.CANCELLED, 'job cancel failed');

  try {
    await new EnterpriseJob({
      name: 'base.job',
      type: JobType.MANUAL,
    }).execute();

    throw new Error('base job execute should fail');
  } catch (error) {
    assert(error instanceof JobRegistrationError, 'wrong base job contract error');
  }

  assert(typeof enterpriseSchedulerMiddleware === 'function', 'scheduler middleware not exported');

  assert(core.scheduler, 'scheduler not exported from core');
  assert(typeof core.scheduler.createEnterpriseScheduler === 'function', 'core scheduler export invalid');

  console.log('✅ Enterprise Scheduler and Background Jobs verification passed');
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
