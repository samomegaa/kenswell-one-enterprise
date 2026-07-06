const {
  createEnterpriseContext,
} = require('../../../src/enterprise/context');

const {
  createWorkflowContext,
} = require('../../../src/enterprise/workflow');

const {
  TransactionBoundary,
  TransactionManager,
  defaultTransactionManager,
  OutboxEventStatus,
  OutboxEventType,
  createOutboxEvent,
  addOutboxEvent,
  listOutboxEvents,
  listPendingOutboxEvents,
  markOutboxEventDispatched,
  markOutboxEventFailed,
  clearOutboxEvents,
  enterpriseTransactionMiddleware,
} = require('../../../src/enterprise/transactions');

const core = require('../../../packages/core/src');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function run() {
  clearOutboxEvents();
  defaultTransactionManager.clear();

  const enterpriseContext = createEnterpriseContext({
    tenant: {
      id: 'tenant_transactions',
      slug: 'transactions',
      name: 'Transactions Tenant',
    },
    identity: {
      userId: 'user_transactions',
      email: 'transactions@example.com',
    },
    auth: {
      authenticated: true,
      provider: 'local',
      tokenType: 'bearer',
    },
    rbac: {
      roles: ['operator'],
      permissions: ['transaction:write'],
    },
  });

  const workflowContext = createWorkflowContext({
    enterpriseContext,
    workflowName: 'transaction.verification',
  });

  const boundary = new TransactionBoundary({
    enterpriseContext,
    workflowContext,
  });

  assert(boundary.transactionId.startsWith('tx_'), 'transactionId invalid');

  const stagedEvent = boundary.addOutboxEvent({
    type: OutboxEventType.DOMAIN_EVENT,
    topic: 'verification.created',
    payload: {
      id: 'verification_001',
    },
  });

  assert(stagedEvent.outboxId.startsWith('outbox_'), 'outboxId invalid');
  assert(stagedEvent.status === OutboxEventStatus.PENDING, 'outbox status invalid');
  assert(listOutboxEvents().length === 0, 'staged event should not be globally stored before commit');

  const commitResult = await boundary.commit();

  assert(commitResult.committed === true, 'transaction did not commit');
  assert(commitResult.outboxEvents === 1, 'commit outbox count mismatch');
  assert(listOutboxEvents().length === 1, 'outbox event not persisted after commit');
  assert(listPendingOutboxEvents().length === 1, 'pending outbox count mismatch');

  const dispatched = markOutboxEventDispatched(stagedEvent.outboxId);

  assert(dispatched.status === OutboxEventStatus.DISPATCHED, 'outbox dispatch failed');
  assert(dispatched.attempts === 1, 'dispatch attempts mismatch');

  const directEvent = createOutboxEvent({
    transactionId: 'tx_direct',
    type: OutboxEventType.INTEGRATION_EVENT,
    topic: 'integration.sync',
    payload: { ok: true },
  });

  addOutboxEvent(directEvent);

  const failed = markOutboxEventFailed(directEvent.outboxId, new Error('expected failure'));

  assert(failed.status === OutboxEventStatus.FAILED, 'outbox failed status mismatch');
  assert(failed.error === 'expected failure', 'outbox failure reason mismatch');

  const rollbackBoundary = new TransactionBoundary({
    enterpriseContext,
    workflowContext,
  });

  rollbackBoundary.addOutboxEvent({
    type: OutboxEventType.DOMAIN_EVENT,
    topic: 'verification.rollback',
    payload: {},
  });

  const rollbackResult = await rollbackBoundary.rollback(new Error('rollback verification'));

  assert(rollbackResult.rolledBack === true, 'transaction did not rollback');
  assert(rollbackResult.discardedOutboxEvents === 1, 'rollback did not discard staged outbox events');

  const manager = new TransactionManager();

  const managed = manager.begin({
    enterpriseContext,
    workflowContext,
  });

  assert(manager.listActive().length === 1, 'manager did not track active transaction');

  await manager.commit(managed.transactionId);

  assert(manager.listActive().length === 0, 'manager did not clear committed transaction');

  assert(typeof enterpriseTransactionMiddleware === 'function', 'transaction middleware not exported');
  assert(core.transactions, 'transactions not exported from core');
  assert(typeof core.transactions.TransactionBoundary === 'function', 'core transaction export invalid');

  console.log('✅ Enterprise Transaction Boundary and Outbox verification passed');
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
