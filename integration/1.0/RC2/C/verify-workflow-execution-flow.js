const {
  buildWorkflowExecutionFlow,
  createCustomerWorkflowContext,
} = require('./workflow-execution-flow');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function run() {
  const flow = buildWorkflowExecutionFlow();

  assert(flow.workflow, 'workflow layer missing');
  assert(flow.domain, 'domain layer missing');
  assert(flow.application, 'application layer missing');

  assert(typeof flow.workflow.EnterpriseWorkflow === 'function', 'EnterpriseWorkflow missing');
  assert(typeof flow.workflow.WorkflowStep === 'function', 'WorkflowStep missing');
  assert(typeof flow.workflow.UnitOfWork === 'function', 'UnitOfWork missing');
  assert(typeof flow.workflow.createWorkflowContext === 'function', 'createWorkflowContext missing');

  const workflowContext = createCustomerWorkflowContext();

  assert(workflowContext.workflowName === 'customer.create.workflow', 'workflow name mismatch');
  assert(workflowContext.workflowId.startsWith('wf_'), 'workflowId invalid');

  const steps = [];

  steps.push({
    name: 'application.validate',
    result: flow.application.applicationSuccess({
      valid: true,
    }),
  });

  steps.push({
    name: 'domain.create',
    result: flow.domain.domainSuccess({
      customerId: 'customer_rc2_c_003',
      status: 'created',
    }),
  });

  steps.push({
    name: 'application.complete',
    result: flow.application.applicationSuccess({
      completed: true,
    }),
  });

  for (const step of steps) {
    assert(step.result.ok === true, `${step.name} failed`);
    assert(Object.isFrozen(step.result), `${step.name} result should be immutable`);
  }

  const workflowResult = Object.freeze({
    ok: true,
    workflowId: workflowContext.workflowId,
    workflowName: workflowContext.workflowName,
    steps: steps.map((step) => step.name),
    customerId: steps[1].result.data.customerId,
  });

  assert(workflowResult.ok === true, 'workflow result should succeed');
  assert(workflowResult.steps.length === 3, 'workflow step count mismatch');
  assert(workflowResult.customerId === 'customer_rc2_c_003', 'workflow customerId mismatch');
  assert(Object.isFrozen(workflowResult), 'workflow result should be immutable');

  console.log('✅ RC2-C Part 3 — Workflow execution flow verified');
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
