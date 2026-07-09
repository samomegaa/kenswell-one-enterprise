const {
  createEnterpriseContext,
  requireEnterpriseContext,
  enterpriseContextMiddleware,
} = require('../../../src/enterprise/context');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const context = createEnterpriseContext({
  tenant: {
    id: 'tenant_test',
    slug: 'test',
    name: 'Test Tenant',
  },
  identity: {
    userId: 'user_test',
    email: 'test@example.com',
  },
  auth: {
    authenticated: true,
    provider: 'local',
    tokenType: 'bearer',
  },
  rbac: {
    roles: ['admin'],
    permissions: ['enterprise:read'],
  },
});

assert(context.requestId, 'requestId missing');
assert(context.correlationId, 'correlationId missing');
assert(context.tenant.id === 'tenant_test', 'tenant not resolved');
assert(context.identity.userId === 'user_test', 'identity not resolved');
assert(context.auth.authenticated === true, 'auth not resolved');
assert(context.rbac.roles.includes('admin'), 'roles not resolved');
assert(context.rbac.permissions.includes('enterprise:read'), 'permissions not resolved');

assert(
  requireEnterpriseContext({ enterpriseContext: context }).tenant.id === 'tenant_test',
  'requireEnterpriseContext failed'
);

assert(
  typeof enterpriseContextMiddleware === 'function',
  'enterpriseContextMiddleware not exported'
);

console.log('✅ Enterprise Context verification passed');
