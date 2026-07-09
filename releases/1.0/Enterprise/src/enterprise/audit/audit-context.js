const crypto = require('crypto');
const { InvalidAuditContextError } = require('./audit-errors');

function createAuditId() {
  return `audit_${crypto.randomUUID()}`;
}

function createAuditContext({
  enterpriseContext,
  event,
  action,
  entity,
  entityId,
  actorType = 'user',
  metadata = {},
} = {}) {
  if (!enterpriseContext || typeof enterpriseContext !== 'object') {
    throw new InvalidAuditContextError({ reason: 'enterpriseContext is required' });
  }

  if (!event || typeof event !== 'string') {
    throw new InvalidAuditContextError({ reason: 'event is required' });
  }

  const auditContext = {
    auditId: createAuditId(),
    timestamp: new Date().toISOString(),

    requestId: enterpriseContext.requestId,
    correlationId: enterpriseContext.correlationId,

    tenantId: enterpriseContext.tenant?.id,
    tenantSlug: enterpriseContext.tenant?.slug,

    actorId: enterpriseContext.identity?.userId,
    actorEmail: enterpriseContext.identity?.email,
    actorType,

    roles: Array.isArray(enterpriseContext.rbac?.roles)
      ? [...enterpriseContext.rbac.roles]
      : [],

    permissions: Array.isArray(enterpriseContext.rbac?.permissions)
      ? [...enterpriseContext.rbac.permissions]
      : [],

    event,
    action: action || event,

    entity: entity || null,
    entityId: entityId || null,

    ip: enterpriseContext.metadata?.ip,
    userAgent: enterpriseContext.metadata?.userAgent,

    metadata,
  };

  if (!auditContext.requestId || !auditContext.correlationId || !auditContext.tenantId) {
    throw new InvalidAuditContextError({ auditContext });
  }

  return Object.freeze(auditContext);
}

module.exports = {
  createAuditContext,
};
