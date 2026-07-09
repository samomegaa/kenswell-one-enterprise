const { JobState } = require('./job-state');
const { JobRegistry } = require('./job-registry');

const {
  JobExecutionError,
} = require('./job-errors');

class EnterpriseScheduler {
  constructor({
    registry = new JobRegistry(),
    container = null,
    configuration = null,
    repositories = null,
    compositionRoot = null,
  } = {}) {
    this.registry = registry;
    this.container = container;
    this.configuration = configuration;
    this.repositories = repositories;
    this.compositionRoot = compositionRoot;
  }

  register(job, options = {}) {
    return this.registry.register(job, options);
  }

  has(name) {
    return this.registry.has(name);
  }

  get(name) {
    return this.registry.get(name);
  }

  list() {
    return this.registry.list();
  }

  schedule(name) {
    const record = this.registry.get(name);

    if (record.state !== JobState.REGISTERED) {
      throw new JobExecutionError('job cannot be scheduled from current state', {
        job: name,
        state: record.state,
      });
    }

    return this.registry.updateState(name, JobState.SCHEDULED);
  }

  cancel(name) {
    const record = this.registry.get(name);

    if (
      record.state === JobState.COMPLETED ||
      record.state === JobState.FAILED ||
      record.state === JobState.CANCELLED
    ) {
      throw new JobExecutionError('job cannot be cancelled from current state', {
        job: name,
        state: record.state,
      });
    }

    return this.registry.updateState(name, JobState.CANCELLED);
  }

  createContext(record) {
    return Object.freeze({
      jobName: record.name,
      jobType: record.type,
      state: record.state,
      container: this.container,
      configuration: this.configuration,
      repositories: this.repositories,
      compositionRoot: this.compositionRoot,
      metadata: record.metadata || {},
      createdAt: new Date().toISOString(),
    });
  }

  async run(name, input = {}) {
    const record = this.registry.get(name);

    if (
      record.state !== JobState.REGISTERED &&
      record.state !== JobState.SCHEDULED
    ) {
      throw new JobExecutionError('job cannot be run from current state', {
        job: name,
        state: record.state,
      });
    }

    this.registry.updateState(name, JobState.RUNNING);

    try {
      const result = await record.job.execute(this.createContext(record), input);

      const completed = this.registry.updateState(name, JobState.COMPLETED);

      return Object.freeze({
        ok: true,
        job: name,
        state: completed.state,
        result,
      });
    } catch (error) {
      this.registry.updateState(name, JobState.FAILED, {
        error: error.message,
      });

      throw new JobExecutionError('job execution failed', {
        job: name,
        error: error.message,
      });
    }
  }
}

function createEnterpriseScheduler(options = {}) {
  return new EnterpriseScheduler(options);
}

module.exports = {
  EnterpriseScheduler,
  createEnterpriseScheduler,
};
