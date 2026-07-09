class EnterpriseSecurityError extends Error {
  constructor(message, details = {}) {
    super(message);
    this.name = 'EnterpriseSecurityError';
    this.details = details;
    this.statusCode = 500;
  }
}

class SecurityHeaderError extends EnterpriseSecurityError {
  constructor(message, details = {}) {
    super(message, details);
    this.name = 'SecurityHeaderError';
  }
}

class RuntimeGuardError extends EnterpriseSecurityError {
  constructor(message, details = {}) {
    super(message, details);
    this.name = 'RuntimeGuardError';
    this.statusCode = 403;
  }
}

class RequestGuardError extends EnterpriseSecurityError {
  constructor(message, details = {}) {
    super(message, details);
    this.name = 'RequestGuardError';
    this.statusCode = 400;
  }
}

module.exports = {
  EnterpriseSecurityError,
  SecurityHeaderError,
  RuntimeGuardError,
  RequestGuardError,
};
