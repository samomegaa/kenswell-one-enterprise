const {
  buildRbacPermissionFlow,
  createPermissionContext,
  hasPermission,
} = require('./rbac-permission-flow');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function run() {
  const flow = buildRbacPermissionFlow();

  assert(flow.rbac, 'rbac layer missing');
  assert(flow.context, 'context layer missing');

  assert(typeof flow.rbac.RBACService === 'function', 'RBACService missing');
  assert(typeof flow.rbac.PermissionEngine === 'function', 'PermissionEngine missing');
  assert(typeof flow.rbac.createRBACService === 'function', 'createRBACService missing');

  const permissionContext = createPermissionContext({
    roles: ['operator'],
    permissions: ['customer:create', 'customer:read'],
  });

  assert(Object.isFrozen(permissionContext), 'permission context should be immutable');

  assert(
    hasPermission(permissionContext, 'customer:create') === true,
    'customer:create permission should be granted'
  );

  assert(
    hasPermission(permissionContext, 'customer:delete') === false,
    'customer:delete permission should be denied'
  );

  const enterpriseContext = flow.context.createEnterpriseContext({
    tenant: {
      id: 'tenant_rc2_b',
      slug: 'rc2-b',
      name: 'RC2-B Tenant',
    },
    identity: {
      userId: 'user_rc2_b_002',
      email: 'rbac@example.com',
    },
    auth: {
      authenticated: true,
      provider: 'local',
    },
    rbac: permissionContext.rbac,
  });

  assert(enterpriseContext.rbac.permissions.includes('customer:create'), 'context permission missing');
  assert(enterpriseContext.rbac.roles.includes('operator'), 'context role missing');

  console.log('✅ RC2-B Part 2 — RBAC permission decision flow verified');
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
