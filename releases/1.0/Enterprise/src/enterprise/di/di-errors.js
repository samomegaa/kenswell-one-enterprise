class EnterpriseDiError extends Error {
  constructor(message, details = {}) {
    super(message);
    this.name = 'EnterpriseDiError';
    this.details = details;
    this.statusCode = 500;
  }
}

class ServiceRegistrationError extends EnterpriseDiError {
  constructor(message, details = {}) {
    super(message, details);
    this.name = 'ServiceRegistrationError';
  }
}

class ServiceResolutionError extends EnterpriseDiError {
  constructor(message, details = {}) {
    super(message, details);
    this.name = 'ServiceResolutionError';
  }
}

module.exports = {
  EnterpriseDiError,
  ServiceRegistrationError,
  ServiceResolutionError,
};
