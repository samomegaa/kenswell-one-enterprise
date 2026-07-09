const { TransactionBoundary } = require('./transaction-boundary');

class TransactionManager {
  constructor() {
    this.activeTransactions = new Map();
  }

  begin(options = {}) {
    const boundary = new TransactionBoundary(options);
    this.activeTransactions.set(boundary.transactionId, boundary);
    return boundary;
  }

  get(transactionId) {
    return this.activeTransactions.get(transactionId);
  }

  async commit(transactionId) {
    const boundary = this.get(transactionId);

    if (!boundary) {
      throw new Error(`transaction not found: ${transactionId}`);
    }

    const result = await boundary.commit();
    this.activeTransactions.delete(transactionId);
    return result;
  }

  async rollback(transactionId, cause) {
    const boundary = this.get(transactionId);

    if (!boundary) {
      throw new Error(`transaction not found: ${transactionId}`);
    }

    const result = await boundary.rollback(cause);
    this.activeTransactions.delete(transactionId);
    return result;
  }

  listActive() {
    return Array.from(this.activeTransactions.values());
  }

  clear() {
    this.activeTransactions.clear();
  }
}

const defaultTransactionManager = new TransactionManager();

module.exports = {
  TransactionManager,
  defaultTransactionManager,
};
