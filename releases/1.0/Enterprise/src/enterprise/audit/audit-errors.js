class EnterpriseAuditError extends Error {
  constructor(message, details = {}) {
    super(message);
    this.name = 'EnterpriseAuditError';
    this.details = details;
    this.statusCode = 500;
  }
}

class InvalidAuditContextError extends EnterpriseAuditError {
  constructor(details = {}) {
    super('Audit context is invalid.', details);
    this.name = 'InvalidAuditContextError';
    this.statusCode = 400;
  }
}

class AuditProviderError extends EnterpriseAuditError {
  constructor(message, details = {}) {
    super(message, details);
    this.name = 'AuditProviderError';
    this.statusCode = 500;
  }
}

module.exports = {
  EnterpriseAuditError,
  InvalidAuditContextError,
  AuditProviderError,
};
