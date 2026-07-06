const crypto = require('crypto');

function createCorrelationId(prefix = 'corr') {
  return `${prefix}_${crypto.randomUUID()}`;
}

function extractCorrelationContext({
  enterpriseContext = null,
  workflowContext = null,
  transactionBoundary = null,
  span = null,
  metadata = {},
} = {}) {
  return Object.freeze({
    requestId: enterpriseContext?.requestId || metadata.requestId || null,
    correlationId: enterpriseContext?.correlationId || metadata.correlationId || createCorrelationId(),
    tenantId: enterpriseContext?.tenant?.id || metadata.tenantId || null,
    tenantSlug: enterpriseContext?.tenant?.slug || metadata.tenantSlug || null,
    actorId: enterpriseContext?.identity?.userId || metadata.actorId || null,
    actorEmail: enterpriseContext?.identity?.email || metadata.actorEmail || null,
    workflowId: workflowContext?.workflowId || metadata.workflowId || null,
    transactionId: transactionBoundary?.transactionId || metadata.transactionId || null,
    traceId: span?.traceId || metadata.traceId || null,
    spanId: span?.spanId || metadata.spanId || null,
  });
}

module.exports = {
  createCorrelationId,
  extractCorrelationContext,
};
