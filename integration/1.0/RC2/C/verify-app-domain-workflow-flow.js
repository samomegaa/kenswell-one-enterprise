const {
  buildAppDomainWorkflowFlow,
  createExecutionContext,
  executeCustomerCreation,
} = require('./app-domain-workflow-flow');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function run() {
  const flow = buildAppDomainWorkflowFlow();

  assert(flow.application, 'application layer missing');
  assert(flow.domain, 'domain layer missing');
  assert(flow.workflow, 'workflow layer missing');
  assert(flow.context, 'context layer missing');

  const executionContext = createExecutionContext();

  assert(executionContext.enterpriseContext.tenant.id === 'tenant_rc2_c', 'tenant mismatch');
  assert(executionContext.workflowContext.workflowName === 'customer.create.integration', 'workflow name mismatch');
  assert(executionContext.workflowContext.workflowId.startsWith('wf_'), 'workflowId invalid');

  const result = executeCustomerCreation({
    name: 'Kenswell Customer',
  });

  assert(result.ok === true, 'execution should succeed');
  assert(result.applicationResult.ok === true, 'application result should succeed');
  assert(result.domainResult.ok === true, 'domain result should succeed');
  assert(result.workflowResult.ok === true, 'workflow result should succeed');

  assert(result.applicationResult.data.accepted === true, 'application accepted mismatch');
  assert(result.domainResult.data.customerId === 'customer_rc2_c_004', 'domain customerId mismatch');
  assert(result.workflowResult.workflowStatus === 'completed', 'workflow status mismatch');
  assert(result.workflowResult.steps.length === 3, 'workflow steps mismatch');

  assert(Object.isFrozen(result), 'final result should be immutable');
  assert(Object.isFrozen(result.workflowResult), 'workflow result should be immutable');

  const failed = executeCustomerCreation({});

  assert(failed.ok === false, 'missing name should fail');
  assert(failed.error.message === 'customer name is required', 'failure reason mismatch');

  console.log('✅ RC2-C Part 4 — Application Domain Workflow integration verified');
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
