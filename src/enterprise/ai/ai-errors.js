class EnterpriseAiError extends Error {
  constructor(message, details = {}) {
    super(message);
    this.name = 'EnterpriseAiError';
    this.details = details;
    this.statusCode = 500;
  }
}

class AiProviderRegistrationError extends EnterpriseAiError {
  constructor(message, details = {}) {
    super(message, details);
    this.name = 'AiProviderRegistrationError';
  }
}

class AiProviderNotFoundError extends EnterpriseAiError {
  constructor(message, details = {}) {
    super(message, details);
    this.name = 'AiProviderNotFoundError';
    this.statusCode = 404;
  }
}

class AiExecutionError extends EnterpriseAiError {
  constructor(message, details = {}) {
    super(message, details);
    this.name = 'AiExecutionError';
  }
}

module.exports = {
  EnterpriseAiError,
  AiProviderRegistrationError,
  AiProviderNotFoundError,
  AiExecutionError,
};
