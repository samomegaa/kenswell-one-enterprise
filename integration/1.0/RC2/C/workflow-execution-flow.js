const core = require('../../../../packages/core/src');

function buildWorkflowExecutionFlow() {
  return Object.freeze({
    application: core.application,
    domain: core.domain,
    workflow: core.workflow,
    context: core.context,
  });
}

function createCustomerWorkflowContext() {
  return core.workflow.createWorkflowContext({
    workflowName: 'customer.create.workflow',
    enterpriseContext: core.context.createEnterpriseContext({
      tenant: {
        id: 'tenant_rc2_c',
        slug: 'rc2-c',
        name: 'RC2-C Tenant',
      },
      identity: {
        userId: 'user_rc2_c_003',
        email: 'workflow@example.com',
      },
      auth: {
        authenticated: true,
        provider: 'local',
      },
      rbac: {
        roles: ['operator'],
        permissions: ['customer:create'],
      },
    }),
  });
}

module.exports = {
  buildWorkflowExecutionFlow,
  createCustomerWorkflowContext,
};
