class EnterpriseApplicationError extends Error {
  constructor(message, details = {}) {
    super(message);
    this.name = 'EnterpriseApplicationError';
    this.details = details;
    this.statusCode = 500;
  }
}

class ApplicationServiceError extends EnterpriseApplicationError {
  constructor(message, details = {}) {
    super(message, details);
    this.name = 'ApplicationServiceError';
  }
}

class ApplicationUseCaseError extends EnterpriseApplicationError {
  constructor(useCaseName, cause) {
    super(`Application use case failed: ${useCaseName}`, {
      useCaseName,
      cause: cause?.message || String(cause),
    });

    this.name = 'ApplicationUseCaseError';
  }
}

class ApplicationServiceNotFoundError extends EnterpriseApplicationError {
  constructor(serviceName) {
    super(`Application service not found: ${serviceName}`, { serviceName });
    this.name = 'ApplicationServiceNotFoundError';
    this.statusCode = 404;
  }
}

module.exports = {
  EnterpriseApplicationError,
  ApplicationServiceError,
  ApplicationUseCaseError,
  ApplicationServiceNotFoundError,
};
