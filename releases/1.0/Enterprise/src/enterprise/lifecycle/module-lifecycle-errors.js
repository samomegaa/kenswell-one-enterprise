class EnterpriseModuleLifecycleError extends Error {
  constructor(message, details = {}) {
    super(message);
    this.name = 'EnterpriseModuleLifecycleError';
    this.details = details;
    this.statusCode = 500;
  }
}

class ModuleRegistrationError extends EnterpriseModuleLifecycleError {
  constructor(message, details = {}) {
    super(message, details);
    this.name = 'ModuleRegistrationError';
  }
}

class ModuleLifecycleTransitionError extends EnterpriseModuleLifecycleError {
  constructor(message, details = {}) {
    super(message, details);
    this.name = 'ModuleLifecycleTransitionError';
  }
}

class ModuleNotFoundError extends EnterpriseModuleLifecycleError {
  constructor(message, details = {}) {
    super(message, details);
    this.name = 'ModuleNotFoundError';
    this.statusCode = 404;
  }
}

module.exports = {
  EnterpriseModuleLifecycleError,
  ModuleRegistrationError,
  ModuleLifecycleTransitionError,
  ModuleNotFoundError,
};
