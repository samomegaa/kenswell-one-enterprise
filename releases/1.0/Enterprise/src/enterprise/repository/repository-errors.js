class EnterpriseRepositoryError extends Error {
  constructor(message, details = {}) {
    super(message);
    this.name = 'EnterpriseRepositoryError';
    this.details = details;
    this.statusCode = 500;
  }
}

class RepositoryContractError extends EnterpriseRepositoryError {
  constructor(message, details = {}) {
    super(message, details);
    this.name = 'RepositoryContractError';
  }
}

class RepositoryNotFoundError extends EnterpriseRepositoryError {
  constructor(message, details = {}) {
    super(message, details);
    this.name = 'RepositoryNotFoundError';
    this.statusCode = 404;
  }
}

class RepositoryOperationError extends EnterpriseRepositoryError {
  constructor(message, details = {}) {
    super(message, details);
    this.name = 'RepositoryOperationError';
  }
}

module.exports = {
  EnterpriseRepositoryError,
  RepositoryContractError,
  RepositoryNotFoundError,
  RepositoryOperationError,
};
