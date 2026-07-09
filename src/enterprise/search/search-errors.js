class EnterpriseSearchError extends Error {
  constructor(message, details = {}) {
    super(message);
    this.name = 'EnterpriseSearchError';
    this.details = details;
    this.statusCode = 500;
  }
}

class SearchDocumentError extends EnterpriseSearchError {
  constructor(message, details = {}) {
    super(message, details);
    this.name = 'SearchDocumentError';
  }
}

class SearchIndexNotFoundError extends EnterpriseSearchError {
  constructor(message, details = {}) {
    super(message, details);
    this.name = 'SearchIndexNotFoundError';
    this.statusCode = 404;
  }
}

class SearchExecutionError extends EnterpriseSearchError {
  constructor(message, details = {}) {
    super(message, details);
    this.name = 'SearchExecutionError';
  }
}

module.exports = {
  EnterpriseSearchError,
  SearchDocumentError,
  SearchIndexNotFoundError,
  SearchExecutionError,
};
