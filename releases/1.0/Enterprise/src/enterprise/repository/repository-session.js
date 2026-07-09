const crypto = require('crypto');

const {
  RepositoryOperationError,
} = require('./repository-errors');

function createSessionId() {
  return `repo_session_${crypto.randomUUID()}`;
}

class RepositorySession {
  constructor({
    metadata = {},
  } = {}) {
    this.sessionId = createSessionId();
    this.metadata = Object.freeze({ ...metadata });
    this.operations = [];
    this.committed = false;
    this.rolledBack = false;
    this.createdAt = new Date().toISOString();
    this.committedAt = null;
    this.rolledBackAt = null;
  }

  record(operation) {
    if (this.committed || this.rolledBack) {
      throw new RepositoryOperationError('cannot record operation after session is closed', {
        sessionId: this.sessionId,
      });
    }

    const entry = Object.freeze({
      ...operation,
      recordedAt: new Date().toISOString(),
    });

    this.operations.push(entry);

    return entry;
  }

  listOperations() {
    return [...this.operations];
  }

  commit() {
    if (this.rolledBack) {
      throw new RepositoryOperationError('cannot commit rolled back session', {
        sessionId: this.sessionId,
      });
    }

    if (this.committed) {
      throw new RepositoryOperationError('session already committed', {
        sessionId: this.sessionId,
      });
    }

    this.committed = true;
    this.committedAt = new Date().toISOString();

    return this.snapshot();
  }

  rollback(reason = 'rollback requested') {
    if (this.committed) {
      throw new RepositoryOperationError('cannot rollback committed session', {
        sessionId: this.sessionId,
      });
    }

    if (this.rolledBack) {
      throw new RepositoryOperationError('session already rolled back', {
        sessionId: this.sessionId,
      });
    }

    this.rolledBack = true;
    this.rolledBackAt = new Date().toISOString();
    this.rollbackReason = reason;

    return this.snapshot();
  }

  snapshot() {
    return Object.freeze({
      sessionId: this.sessionId,
      metadata: this.metadata,
      operationCount: this.operations.length,
      committed: this.committed,
      rolledBack: this.rolledBack,
      createdAt: this.createdAt,
      committedAt: this.committedAt,
      rolledBackAt: this.rolledBackAt,
      rollbackReason: this.rollbackReason || null,
    });
  }
}

function createRepositorySession(options = {}) {
  return new RepositorySession(options);
}

module.exports = {
  RepositorySession,
  createRepositorySession,
};
