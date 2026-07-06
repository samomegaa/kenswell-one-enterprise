class EnterpriseDomainError extends Error {
  constructor(message, details = {}) {
    super(message);
    this.name = 'EnterpriseDomainError';
    this.details = details;
    this.statusCode = 500;
  }
}

class DomainServiceError extends EnterpriseDomainError {
  constructor(message, details = {}) {
    super(message, details);
    this.name = 'DomainServiceError';
  }
}

class DomainOperationError extends EnterpriseDomainError {
  constructor(operationName, cause) {
    super(`Domain operation failed: ${operationName}`, {
      operationName,
      cause: cause?.message || String(cause),
    });

    this.name = 'DomainOperationError';
  }
}

class DomainServiceNotFoundError extends EnterpriseDomainError {
  constructor(serviceName) {
    super(`Domain service not found: ${serviceName}`, { serviceName });
    this.name = 'DomainServiceNotFoundError';
    this.statusCode = 404;
  }
}

module.exports = {
  EnterpriseDomainError,
  DomainServiceError,
  DomainOperationError,
  DomainServiceNotFoundError,
};
