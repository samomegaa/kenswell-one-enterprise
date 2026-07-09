class EnterpriseLoggingError extends Error {
  constructor(message, details = {}) {
    super(message);
    this.name = 'EnterpriseLoggingError';
    this.details = details;
    this.statusCode = 500;
  }
}

class LoggerProviderError extends EnterpriseLoggingError {
  constructor(message, details = {}) {
    super(message, details);
    this.name = 'LoggerProviderError';
  }
}

class LogEntryError extends EnterpriseLoggingError {
  constructor(message, details = {}) {
    super(message, details);
    this.name = 'LogEntryError';
  }
}

module.exports = {
  EnterpriseLoggingError,
  LoggerProviderError,
  LogEntryError,
};
