class EnterpriseResilienceError extends Error {
  constructor(message, details = {}) {
    super(message);
    this.name = 'EnterpriseResilienceError';
    this.details = details;
    this.statusCode = 500;
  }
}

class IdempotencyError extends EnterpriseResilienceError {
  constructor(message, details = {}) {
    super(message, details);
    this.name = 'IdempotencyError';
    this.statusCode = 409;
  }
}

class RetryBoundaryError extends EnterpriseResilienceError {
  constructor(message, details = {}) {
    super(message, details);
    this.name = 'RetryBoundaryError';
  }
}

module.exports = {
  EnterpriseResilienceError,
  IdempotencyError,
  RetryBoundaryError,
};
