class EnterpriseCompositionError extends Error {
  constructor(message, details = {}) {
    super(message);
    this.name = 'EnterpriseCompositionError';
    this.details = details;
    this.statusCode = 500;
  }
}

class CompositionRootError extends EnterpriseCompositionError {
  constructor(message, details = {}) {
    super(message, details);
    this.name = 'CompositionRootError';
  }
}

class CompositionRegistryError extends EnterpriseCompositionError {
  constructor(message, details = {}) {
    super(message, details);
    this.name = 'CompositionRegistryError';
  }
}

module.exports = {
  EnterpriseCompositionError,
  CompositionRootError,
  CompositionRegistryError,
};
