const AuditEvents = Object.freeze({
  REQUEST_STARTED: 'request.started',
  REQUEST_COMPLETED: 'request.completed',
  REQUEST_FAILED: 'request.failed',

  LOGIN: 'identity.login',
  LOGOUT: 'identity.logout',
  TOKEN_REFRESH: 'identity.token.refresh',

  ACCESS_DENIED: 'security.access.denied',
  PERMISSION_GRANTED: 'security.permission.granted',
  PERMISSION_REVOKED: 'security.permission.revoked',

  USER_CREATED: 'identity.user.created',
  USER_UPDATED: 'identity.user.updated',
  USER_DELETED: 'identity.user.deleted',

  TENANT_CREATED: 'tenant.created',
  TENANT_UPDATED: 'tenant.updated',
  TENANT_DELETED: 'tenant.deleted',

  ENTITY_CREATED: 'entity.created',
  ENTITY_UPDATED: 'entity.updated',
  ENTITY_DELETED: 'entity.deleted',

  SYSTEM_START: 'system.start',
  SYSTEM_STOP: 'system.stop',
});

module.exports = {
  AuditEvents,
};
