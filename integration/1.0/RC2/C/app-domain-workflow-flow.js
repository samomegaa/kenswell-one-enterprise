const core = require('../../../../packages/core/src');

function buildAppDomainWorkflowFlow() {
  return Object.freeze({
    application: core.application,
    domain: core.domain,
    workflow: core.workflow,
    context: core.context,
  });
}

function createExecutionContext() {
  const enterpriseContext = core.context.createEnterpriseContext({
    tenant: {
      id: 'tenant_rc2_c',
      slug: 'rc2-c',
      name: 'RC2-C Tenant',
    },
    identity: {
      userId: 'user_rc2_c_004',
      email: 'app-domain-workflow@example.com',
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

  const workflowContext = core.workflow.createWorkflowContext({
    workflowName: 'customer.create.integration',
    enterpriseContext,
  });

  return Object.freeze({
    enterpriseContext,
    workflowContext,
  });
}

function executeCustomerCreation(input = {}) {
  if (!input.name) {
    return core.application.applicationFailure(new Error('customer name is required'));
  }

  const applicationResult = core.application.applicationSuccess({
    accepted: true,
    name: input.name,
  });

  const domainResult = core.domain.domainSuccess({
    customerId: 'customer_rc2_c_004',
    name: input.name,
    status: 'created',
  });

  const workflowResult = Object.freeze({
    ok: true,
    workflowStatus: 'completed',
    customerId: domainResult.data.customerId,
    steps: [
      'application.accepted',
      'domain.created',
      'workflow.completed',
    ],
  });

  return Object.freeze({
    ok: true,
    applicationResult,
    domainResult,
    workflowResult,
  });
}

module.exports = {
  buildAppDomainWorkflowFlow,
  createExecutionContext,
  executeCustomerCreation,
};
