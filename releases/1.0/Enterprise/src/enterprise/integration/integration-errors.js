class EnterpriseIntegrationError extends Error {
  constructor(message, details = {}) {
    super(message);
    this.name = 'EnterpriseIntegrationError';
    this.details = details;
    this.statusCode = 500;
  }
}

class IntegrationRegistrationError extends EnterpriseIntegrationError {
  constructor(message, details = {}) {
    super(message, details);
    this.name = 'IntegrationRegistrationError';
  }
}

class IntegrationNotFoundError extends EnterpriseIntegrationError {
  constructor(message, details = {}) {
    super(message, details);
    this.name = 'IntegrationNotFoundError';
    this.statusCode = 404;
  }
}

class IntegrationExecutionError extends EnterpriseIntegrationError {
  constructor(message, details = {}) {
    super(message, details);
    this.name = 'IntegrationExecutionError';
  }
}

module.exports = {
  EnterpriseIntegrationError,
  IntegrationRegistrationError,
  IntegrationNotFoundError,
  IntegrationExecutionError,
};
