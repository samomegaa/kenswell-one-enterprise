class EnterpriseTransactionError extends Error {
  constructor(message, details = {}) {
    super(message);
    this.name = 'EnterpriseTransactionError';
    this.details = details;
    this.statusCode = 500;
  }
}

class TransactionBoundaryError extends EnterpriseTransactionError {
  constructor(message, details = {}) {
    super(message, details);
    this.name = 'TransactionBoundaryError';
  }
}

class OutboxError extends EnterpriseTransactionError {
  constructor(message, details = {}) {
    super(message, details);
    this.name = 'OutboxError';
  }
}

module.exports = {
  EnterpriseTransactionError,
  TransactionBoundaryError,
  OutboxError,
};
