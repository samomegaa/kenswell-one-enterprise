const crypto = require('crypto');
const { OutboxError } = require('./transaction-errors');
const { OutboxEventStatus } = require('./outbox-events');

const outboxStore = [];

function createOutboxId() {
  return `outbox_${crypto.randomUUID()}`;
}

function createOutboxEvent({
  transactionId,
  workflowId,
  requestId,
  correlationId,
  tenantId,
  actorId,
  type,
  topic,
  payload = {},
  metadata = {},
} = {}) {
  if (!transactionId) {
    throw new OutboxError('transactionId is required');
  }

  if (!type) {
    throw new OutboxError('outbox event type is required');
  }

  if (!topic) {
    throw new OutboxError('outbox event topic is required');
  }

  return Object.freeze({
    outboxId: createOutboxId(),
    transactionId,
    workflowId: workflowId || null,
    requestId: requestId || null,
    correlationId: correlationId || null,
    tenantId: tenantId || null,
    actorId: actorId || null,
    type,
    topic,
    payload,
    metadata,
    status: OutboxEventStatus.PENDING,
    attempts: 0,
    createdAt: new Date().toISOString(),
    dispatchedAt: null,
    failedAt: null,
    error: null,
  });
}

function addOutboxEvent(event) {
  if (!event || typeof event !== 'object') {
    throw new OutboxError('outbox event is required');
  }

  outboxStore.push(event);
  return event;
}

function listOutboxEvents(predicate = () => true) {
  return outboxStore.filter(predicate);
}

function listPendingOutboxEvents() {
  return listOutboxEvents((event) => event.status === OutboxEventStatus.PENDING);
}

function markOutboxEventDispatched(outboxId) {
  const index = outboxStore.findIndex((event) => event.outboxId === outboxId);

  if (index === -1) {
    throw new OutboxError('outbox event not found', { outboxId });
  }

  const updated = Object.freeze({
    ...outboxStore[index],
    status: OutboxEventStatus.DISPATCHED,
    attempts: outboxStore[index].attempts + 1,
    dispatchedAt: new Date().toISOString(),
  });

  outboxStore[index] = updated;
  return updated;
}

function markOutboxEventFailed(outboxId, error) {
  const index = outboxStore.findIndex((event) => event.outboxId === outboxId);

  if (index === -1) {
    throw new OutboxError('outbox event not found', { outboxId });
  }

  const updated = Object.freeze({
    ...outboxStore[index],
    status: OutboxEventStatus.FAILED,
    attempts: outboxStore[index].attempts + 1,
    failedAt: new Date().toISOString(),
    error: error?.message || String(error),
  });

  outboxStore[index] = updated;
  return updated;
}

function clearOutboxEvents() {
  outboxStore.length = 0;
}

module.exports = {
  createOutboxEvent,
  addOutboxEvent,
  listOutboxEvents,
  listPendingOutboxEvents,
  markOutboxEventDispatched,
  markOutboxEventFailed,
  clearOutboxEvents,
};
