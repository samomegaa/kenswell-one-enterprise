const { PersistenceTransactionError } = require('./persistence-errors');

class PersistenceTransaction {
  constructor({ adapter, transactionManager = null } = {}) {
    this.adapter = adapter;
    this.transactionManager = transactionManager;
  }

  async run(work) {
    try {
      if (this.transactionManager?.run) {
        return await this.transactionManager.run(() => this.adapter.transaction(work));
      }
      return await this.adapter.transaction(work);
    } catch (error) {
      if (error instanceof PersistenceTransactionError) throw error;
      throw new PersistenceTransactionError(error.message, { cause: error });
    }
  }
}

module.exports = { PersistenceTransaction };
