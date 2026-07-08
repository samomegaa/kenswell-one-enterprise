class EnterpriseBootstrapError extends Error {
  constructor(message, details = {}) {
    super(message);
    this.name = 'EnterpriseBootstrapError';
    this.details = details;
    this.statusCode = 500;
  }
}

class PlatformBootstrapError extends EnterpriseBootstrapError {
  constructor(message, details = {}) {
    super(message, details);
    this.name = 'PlatformBootstrapError';
  }
}

module.exports = {
  EnterpriseBootstrapError,
  PlatformBootstrapError,
};
