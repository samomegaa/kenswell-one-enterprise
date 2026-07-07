const core = require('../../../../packages/core/src');

function buildAuthRbacPolicyFlow() {
  return Object.freeze({
    context: core.context,
    rbac: core.rbac,
    policy: core.policy,
  });
}

function createAuthRbacContext({
  tenantId = 'tenant_rc2_b',
  userId = 'user_rc2_b_003',
  email = 'policy@example.com',
  roles = ['operator'],
  permissions = ['customer:create'],
} = {}) {
  return core.context.createEnterpriseContext({
    tenant: {
      id: tenantId,
      slug: 'rc2-b',
      name: 'RC2-B Tenant',
    },
    identity: {
      userId,
      email,
    },
    auth: {
      authenticated: true,
      provider: 'local',
    },
    rbac: {
      roles,
      permissions,
    },
  });
}

function createCustomerCreatePolicy() {
  const policy = new core.policy.PolicyBoundary('rc2.customer.create.policy');

  policy.addRule(
    'customer.create.permission',
    (context) => {
      return context.enterpriseContext?.rbac?.permissions?.includes('customer:create');
    },
    'missing customer:create permission'
  );

  return policy;
}

module.exports = {
  buildAuthRbacPolicyFlow,
  createAuthRbacContext,
  createCustomerCreatePolicy,
};
