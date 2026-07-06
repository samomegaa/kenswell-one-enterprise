const OutboxEventStatus = Object.freeze({
  PENDING: 'pending',
  DISPATCHED: 'dispatched',
  FAILED: 'failed',
});

const OutboxEventType = Object.freeze({
  DOMAIN_EVENT: 'domain.event',
  AUDIT_EVENT: 'audit.event',
  NOTIFICATION_EVENT: 'notification.event',
  INTEGRATION_EVENT: 'integration.event',
  WORKFLOW_EVENT: 'workflow.event',
});

module.exports = {
  OutboxEventStatus,
  OutboxEventType,
};
