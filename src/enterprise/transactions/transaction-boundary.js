const crypto = require('crypto');
const { TransactionBoundaryError } = require('./transaction-errors');
const {
  createOutboxEvent,
  addOutboxEvent,
} = require('./outbox');

function createTransactionId() {
  return `tx_${crypto.randomUUID()}`;
}

class TransactionBoundary {
  constructor({
    enterpriseContext,
    workflowContext = null,
    metadata = {},
  } = {}) {
    if (!enterpriseContext || typeof enterpriseContext !== 'object') {
      throw new TransactionBoundaryError('enterpriseContext is required');
    }

    this.transactionId = createTransactionId();
    this.enterpriseContext = enterpriseContext;
    this.workflowContext = workflowContext;
    this.metadata = metadata;
    this.startedAt = new Date().toISOString();
    this.committedAt = null;
    this.rolledBackAt = null;
    this.committed = false;
    this.rolledBack = false;
    this.outboxEvents = [];
  }

  addOutboxEvent({ type, topic, payload = {}, metadata = {} }) {
    const event = createOutboxEvent({
      transactionId: this.transactionId,
      workflowId: this.workflowContext?.workflowId,
      requestId: this.enterpriseContext.requestId,
      correlationId: this.enterpriseContext.correlationId,
      tenantId: this.enterpriseContext.tenant?.id,
      actorId: this.enterpriseContext.identity?.userId,
      type,
      topic,
      payload,
      metadata,
    });

    this.outboxEvents.push(event);
    return event;
  }

  async commit() {
    if (this.rolledBack) {
      throw new TransactionBoundaryError('cannot commit a rolled back transaction');
    }

    for (const event of this.outboxEvents) {
      addOutboxEvent(event);
    }

    this.committed = true;
    this.committedAt = new Date().toISOString();

    return Object.freeze({
      transactionId: this.transactionId,
      committed: true,
      outboxEvents: this.outboxEvents.length,
      committedAt: this.committedAt,
    });
  }

  async rollback(cause) {
    if (this.committed) {
      throw new TransactionBoundaryError('cannot rollback a committed transaction');
    }

    this.rolledBack = true;
    this.rolledBackAt = new Date().toISOString();

    return Object.freeze({
      transactionId: this.transactionId,
      rolledBack: true,
      rolledBackAt: this.rolledBackAt,
      cause: cause?.message || null,
      discardedOutboxEvents: this.outboxEvents.length,
    });
  }
}

module.exports = {
  TransactionBoundary,
};
