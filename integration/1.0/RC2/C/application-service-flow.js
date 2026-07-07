const core = require('../../../../packages/core/src');

function buildApplicationServiceFlow() {
  return Object.freeze({
    application: core.application,
    domain: core.domain,
    workflow: core.workflow,
    context: core.context,
  });
}

function createApplicationExecutionContext() {
  return core.context.createEnterpriseContext({
    tenant: {
      id: 'tenant_rc2_c',
      slug: 'rc2-c',
      name: 'RC2-C Tenant',
    },
    identity: {
      userId: 'user_rc2_c_001',
      email: 'application@example.com',
    },
    auth: {
      authenticated: true,
      provider: 'local',
    },
    rbac: {
      roles: ['operator'],
      permissions: ['customer:create'],
    },
  });
}

module.exports = {
  buildApplicationServiceFlow,
  createApplicationExecutionContext,
};
