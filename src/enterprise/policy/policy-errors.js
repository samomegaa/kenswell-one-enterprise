class EnterprisePolicyError extends Error {
  constructor(message, details = {}) {
    super(message);
    this.name = 'EnterprisePolicyError';
    this.details = details;
    this.statusCode = 500;
  }
}

class ValidationBoundaryError extends EnterprisePolicyError {
  constructor(message, details = {}) {
    super(message, details);
    this.name = 'ValidationBoundaryError';
    this.statusCode = 400;
  }
}

class PolicyBoundaryError extends EnterprisePolicyError {
  constructor(message, details = {}) {
    super(message, details);
    this.name = 'PolicyBoundaryError';
    this.statusCode = 403;
  }
}

module.exports = {
  EnterprisePolicyError,
  ValidationBoundaryError,
  PolicyBoundaryError,
};
