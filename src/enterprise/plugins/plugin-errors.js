class EnterprisePluginError extends Error {
  constructor(message, details = {}) {
    super(message);
    this.name = 'EnterprisePluginError';
    this.details = details;
    this.statusCode = 500;
  }
}

class PluginRegistrationError extends EnterprisePluginError {
  constructor(message, details = {}) {
    super(message, details);
    this.name = 'PluginRegistrationError';
  }
}

class PluginNotFoundError extends EnterprisePluginError {
  constructor(message, details = {}) {
    super(message, details);
    this.name = 'PluginNotFoundError';
    this.statusCode = 404;
  }
}

class PluginTransitionError extends EnterprisePluginError {
  constructor(message, details = {}) {
    super(message, details);
    this.name = 'PluginTransitionError';
  }
}

class PluginValidationError extends EnterprisePluginError {
  constructor(message, details = {}) {
    super(message, details);
    this.name = 'PluginValidationError';
  }
}

module.exports = {
  EnterprisePluginError,
  PluginRegistrationError,
  PluginNotFoundError,
  PluginTransitionError,
  PluginValidationError,
};
