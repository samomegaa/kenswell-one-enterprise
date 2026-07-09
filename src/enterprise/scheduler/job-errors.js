class EnterpriseSchedulerError extends Error {
  constructor(message, details = {}) {
    super(message);
    this.name = 'EnterpriseSchedulerError';
    this.details = details;
    this.statusCode = 500;
  }
}

class JobRegistrationError extends EnterpriseSchedulerError {
  constructor(message, details = {}) {
    super(message, details);
    this.name = 'JobRegistrationError';
  }
}

class JobNotFoundError extends EnterpriseSchedulerError {
  constructor(message, details = {}) {
    super(message, details);
    this.name = 'JobNotFoundError';
    this.statusCode = 404;
  }
}

class JobExecutionError extends EnterpriseSchedulerError {
  constructor(message, details = {}) {
    super(message, details);
    this.name = 'JobExecutionError';
  }
}

module.exports = {
  EnterpriseSchedulerError,
  JobRegistrationError,
  JobNotFoundError,
  JobExecutionError,
};
