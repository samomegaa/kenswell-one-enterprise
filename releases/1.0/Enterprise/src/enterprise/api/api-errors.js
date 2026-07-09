class EnterpriseApiError extends Error {
  constructor(message, details = {}) {
    super(message);
    this.name = 'EnterpriseApiError';
    this.details = details;
    this.statusCode = 500;
  }
}

class ApiBoundaryError extends EnterpriseApiError {
  constructor(message, details = {}) {
    super(message, details);
    this.name = 'ApiBoundaryError';
  }
}

class ApiControllerError extends EnterpriseApiError {
  constructor(controllerName, cause) {
    super(`API controller failed: ${controllerName}`, {
      controllerName,
      cause: cause?.message || String(cause),
    });

    this.name = 'ApiControllerError';
  }
}

class ApplicationServiceExecutionError extends EnterpriseApiError {
  constructor(serviceName, useCaseName, cause) {
    super(`Application service execution failed: ${serviceName}.${useCaseName}`, {
      serviceName,
      useCaseName,
      cause: cause?.message || String(cause),
    });

    this.name = 'ApplicationServiceExecutionError';
  }
}

module.exports = {
  EnterpriseApiError,
  ApiBoundaryError,
  ApiControllerError,
  ApplicationServiceExecutionError,
};
