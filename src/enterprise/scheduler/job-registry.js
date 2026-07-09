const { JobState } = require('./job-state');

const {
  JobRegistrationError,
  JobNotFoundError,
} = require('./job-errors');

function freezeJobRecord(record) {
  return Object.freeze({
    ...record,
    metadata: Object.freeze({
      ...(record.metadata || {}),
    }),
  });
}

class JobRegistry {
  constructor() {
    this.jobs = new Map();
  }

  register(job, options = {}) {
    if (!job || typeof job !== 'object') {
      throw new JobRegistrationError('job instance is required');
    }

    if (!job.name || typeof job.name !== 'string') {
      throw new JobRegistrationError('job name is required');
    }

    if (this.jobs.has(job.name)) {
      throw new JobRegistrationError('job already registered', {
        job: job.name,
      });
    }

    const record = {
      name: job.name,
      type: job.type,
      job,
      state: JobState.REGISTERED,
      metadata: {
        ...(job.metadata || {}),
        ...(options.metadata || {}),
      },
      registeredAt: new Date().toISOString(),
      scheduledAt: null,
      startedAt: null,
      completedAt: null,
      failedAt: null,
      cancelledAt: null,
      lastError: null,
    };

    this.jobs.set(job.name, record);

    return freezeJobRecord(record);
  }

  has(name) {
    return this.jobs.has(name);
  }

  get(name) {
    const record = this.jobs.get(name);

    if (!record) {
      throw new JobNotFoundError('job not registered', {
        job: name,
      });
    }

    return freezeJobRecord(record);
  }

  getJob(name) {
    return this.get(name).job;
  }

  updateState(name, state, details = {}) {
    const record = this.jobs.get(name);

    if (!record) {
      throw new JobNotFoundError('job not registered', {
        job: name,
      });
    }

    record.state = state;

    if (state === JobState.SCHEDULED) {
      record.scheduledAt = new Date().toISOString();
    }

    if (state === JobState.RUNNING) {
      record.startedAt = new Date().toISOString();
    }

    if (state === JobState.COMPLETED) {
      record.completedAt = new Date().toISOString();
    }

    if (state === JobState.FAILED) {
      record.failedAt = new Date().toISOString();
      record.lastError = details.error || null;
    }

    if (state === JobState.CANCELLED) {
      record.cancelledAt = new Date().toISOString();
    }

    return freezeJobRecord(record);
  }

  list() {
    return Array.from(this.jobs.values()).map(freezeJobRecord);
  }

  clear() {
    this.jobs.clear();
  }
}

const defaultJobRegistry = new JobRegistry();

module.exports = {
  JobRegistry,
  defaultJobRegistry,
};
