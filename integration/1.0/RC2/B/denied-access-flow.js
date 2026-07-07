const core = require('../../../../packages/core/src');

function buildDeniedAccessFlow() {
  return Object.freeze({
    context: core.context,
    policy: core.policy,
    logging: core.logging,
  });
}

function createDeniedAccessContext() {
  return core.context.createEnterpriseContext({
    tenant: {
      id: 'tenant_rc2_b',
      slug: 'rc2-b',
      name: 'RC2-B Tenant',
    },
    identity: {
      userId: 'user_rc2_b_denied',
      email: 'denied@example.com',
    },
    auth: {
      authenticated: true,
      provider: 'local',
    },
    rbac: {
      roles: ['viewer'],
      permissions: ['customer:read'],
    },
  });
}

function createDeleteCustomerPolicy() {
  const policy = new core.policy.PolicyBoundary('rc2.customer.delete.policy');

  policy.addRule(
    'customer.delete.permission',
    (context) => {
      return context.enterpriseContext?.rbac?.permissions?.includes('customer:delete');
    },
    'missing customer:delete permission'
  );

  return policy;
}

module.exports = {
  buildDeniedAccessFlow,
  createDeniedAccessContext,
  createDeleteCustomerPolicy,
};
