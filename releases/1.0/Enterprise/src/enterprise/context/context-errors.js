// src/enterprise/context/context-errors.js

class EnterpriseContextError extends Error {
  constructor(message, details = {}) {
    super(message);
    this.name = 'EnterpriseContextError';
    this.details = details;
    this.statusCode = 500;
  }
}

class MissingEnterpriseContextError extends EnterpriseContextError {
  constructor() {
    super('Enterprise context is missing from the request lifecycle.');
    this.name = 'MissingEnterpriseContextError';
    this.statusCode = 500;
  }
}

class InvalidEnterpriseContextError extends EnterpriseContextError {
  constructor(details = {}) {
    super('Enterprise context is invalid.', details);
    this.name = 'InvalidEnterpriseContextError';
    this.statusCode = 400;
  }
}

module.exports = {
  EnterpriseContextError,
  MissingEnterpriseContextError,
  InvalidEnterpriseContextError,
};