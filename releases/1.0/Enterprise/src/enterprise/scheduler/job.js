const { JobRegistrationError } = require('./job-errors');

class EnterpriseJob {
  constructor({
    name,
    type,
    metadata = {},
  } = {}) {
    if (!name || typeof name !== 'string') {
      throw new JobRegistrationError('job name is required');
    }

    this.name = name;
    this.type = type;
    this.metadata = Object.freeze({ ...metadata });
  }

  async execute() {
    throw new JobRegistrationError(
      'execute() must be implemented',
      {
        job: this.name,
      }
    );
  }

  describe() {
    return Object.freeze({
      name: this.name,
      type: this.type,
      metadata: this.metadata,
    });
  }
}

module.exports = {
  EnterpriseJob,
};
