const {
  createEnterpriseContext,
} = require('../../../src/enterprise/context');

const {
  createAuditContext,
  recordActivity,
  queryActivity,
  findByRequest,
  findByCorrelation,
  findByActor,
  findByEntity,
  clearActivityTrail,
  AuditProvider,
  MemoryAuditProvider,
  defaultAuditProvider,
  enterpriseAuditMiddleware,
  AuditEvents,
} = require('../../../src/enterprise/audit');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

clearActivityTrail();

const enterpriseContext = createEnterpriseContext({
  tenant: {
    id: 'tenant_audit',
    slug: 'audit',
    name: 'Audit Tenant',
  },
  identity: {
    userId: 'user_audit',
    email: 'audit@example.com',
  },
  auth: {
    authenticated: true,
    provider: 'local',
    tokenType: 'bearer',
  },
  rbac: {
    roles: ['auditor'],
    permissions: ['audit:read', 'audit:write'],
  },
  metadata: {
    ip: '127.0.0.1',
    userAgent: 'verification-agent',
  },
});

const auditContext = createAuditContext({
  enterpriseContext,
  event: AuditEvents.ENTITY_CREATED,
  action: 'created',
  entity: 'verification.entity',
  entityId: 'entity_001',
  metadata: {
    verified: true,
  },
});

assert(auditContext.auditId, 'auditId missing');
assert(auditContext.timestamp, 'timestamp missing');
assert(auditContext.requestId === enterpriseContext.requestId, 'requestId mismatch');
assert(auditContext.correlationId === enterpriseContext.correlationId, 'correlationId mismatch');
assert(auditContext.tenantId === 'tenant_audit', 'tenantId mismatch');
assert(auditContext.actorId === 'user_audit', 'actorId mismatch');
assert(auditContext.roles.includes('auditor'), 'role missing');
assert(auditContext.permissions.includes('audit:write'), 'permission missing');
assert(Object.isFrozen(auditContext), 'audit context must be immutable');

recordActivity(auditContext);

assert(queryActivity().length === 1, 'activity not recorded');
assert(findByRequest(enterpriseContext.requestId).length === 1, 'findByRequest failed');
assert(findByCorrelation(enterpriseContext.correlationId).length === 1, 'findByCorrelation failed');
assert(findByActor('user_audit').length === 1, 'findByActor failed');
assert(findByEntity('verification.entity', 'entity_001').length === 1, 'findByEntity failed');

assert(typeof AuditProvider === 'function', 'AuditProvider not exported');
assert(typeof MemoryAuditProvider === 'function', 'MemoryAuditProvider not exported');
assert(typeof defaultAuditProvider.record === 'function', 'default provider record missing');
assert(typeof enterpriseAuditMiddleware === 'function', 'enterpriseAuditMiddleware not exported');
assert(AuditEvents.REQUEST_STARTED === 'request.started', 'AuditEvents invalid');

console.log('✅ Enterprise Audit verification passed');
