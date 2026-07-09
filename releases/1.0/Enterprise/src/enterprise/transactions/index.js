const { TransactionBoundary } = require('./transaction-boundary');

const {
  TransactionManager,
  defaultTransactionManager,
} = require('./transaction-manager');

const {
  createOutboxEvent,
  addOutboxEvent,
  listOutboxEvents,
  listPendingOutboxEvents,
  markOutboxEventDispatched,
  markOutboxEventFailed,
  clearOutboxEvents,
} = require('./outbox');

const {
  OutboxEventStatus,
  OutboxEventType,
} = require('./outbox-events');

const { enterpriseTransactionMiddleware } = require('./transaction-middleware');

const {
  EnterpriseTransactionError,
  TransactionBoundaryError,
  OutboxError,
} = require('./transaction-errors');

module.exports = {
  TransactionBoundary,
  TransactionManager,
  defaultTransactionManager,

  createOutboxEvent,
  addOutboxEvent,
  listOutboxEvents,
  listPendingOutboxEvents,
  markOutboxEventDispatched,
  markOutboxEventFailed,
  clearOutboxEvents,

  OutboxEventStatus,
  OutboxEventType,

  enterpriseTransactionMiddleware,

  EnterpriseTransactionError,
  TransactionBoundaryError,
  OutboxError,
};
