class EnterprisePlatformOperationError extends Error {
  constructor(message, details = {}) {
    super(message);
    this.name = 'EnterprisePlatformOperationError';
    this.details = details;
    this.statusCode = 500;
  }
}

class PlatformOperationRegistrationError extends EnterprisePlatformOperationError {
  constructor(message, details = {}) {
    super(message, details);
    this.name = 'PlatformOperationRegistrationError';
  }
}

class PlatformOperationNotFoundError extends EnterprisePlatformOperationError {
  constructor(message, details = {}) {
    super(message, details);
    this.name = 'PlatformOperationNotFoundError';
    this.statusCode = 404;
  }
}

class PlatformOperationExecutionError extends EnterprisePlatformOperationError {
  constructor(message, details = {}) {
    super(message, details);
    this.name = 'PlatformOperationExecutionError';
  }
}

module.exports = {
  EnterprisePlatformOperationError,
  PlatformOperationRegistrationError,
  PlatformOperationNotFoundError,
  PlatformOperationExecutionError,
};
