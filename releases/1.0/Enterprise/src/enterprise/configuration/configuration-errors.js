class EnterpriseConfigurationError extends Error {
  constructor(message, details = {}) {
    super(message);
    this.name = 'EnterpriseConfigurationError';
    this.details = details;
    this.statusCode = 500;
  }
}

class ConfigurationNotFoundError extends EnterpriseConfigurationError {
  constructor(message, details = {}) {
    super(message, details);
    this.name = 'ConfigurationNotFoundError';
    this.statusCode = 404;
  }
}

class ConfigurationValidationError extends EnterpriseConfigurationError {
  constructor(message, details = {}) {
    super(message, details);
    this.name = 'ConfigurationValidationError';
  }
}

module.exports = {
  EnterpriseConfigurationError,
  ConfigurationNotFoundError,
  ConfigurationValidationError,
};
