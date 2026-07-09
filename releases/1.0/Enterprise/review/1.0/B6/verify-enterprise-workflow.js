const {
  createEnterpriseContext,
} = require('../../../src/enterprise/context');

const {
  createAuditContext,
  AuditEvents,
} = require('../../../src/enterprise/audit');

const {
  EnterpriseWorkflow,
  WorkflowStep,
  UnitOfWork,
  createWorkflowContext,
  enterpriseWorkflowMiddleware,
  WorkflowExecutionError,
} = require('../../../src/enterprise/workflow');

const core = require('../../../packages/core/src');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function run() {
  const enterpriseContext = createEnterpriseContext({
    tenant: {
      id: 'tenant_workflow',
      slug: 'workflow',
      name: 'Workflow Tenant',
    },
    identity: {
      userId: 'user_workflow',
      email: 'workflow@example.com',
    },
    auth: {
      authenticated: true,
      provider: 'local',
      tokenType: 'bearer',
    },
    rbac: {
      roles: ['operator'],
      permissions: ['workflow:execute'],
    },
  });

  const auditContext = createAuditContext({
    enterpriseContext,
    event: AuditEvents.ENTITY_CREATED,
    action: 'workflow.verify',
    entity: 'workflow',
    entityId: 'workflow_verify',
  });

  const workflowContext = createWorkflowContext({
    enterpriseContext,
    auditContext,
    workflowName: 'verification.workflow',
    metadata: {
      verified: true,
    },
  });

  assert(workflowContext.workflowId.startsWith('wf_'), 'workflowId invalid');
  assert(workflowContext.workflowName === 'verification.workflow', 'workflowName mismatch');
  assert(Object.isFrozen(workflowContext), 'workflowContext must be immutable');

  let stepExecuted = false;

  const step = new WorkflowStep('verify.step', async () => {
    stepExecuted = true;
  });

  await step.execute(workflowContext);

  assert(stepExecuted === true, 'workflow step did not execute');

  const unit = new UnitOfWork(workflowContext);

  unit.addStep(new WorkflowStep('unit.step.1', async () => true));
  unit.addStep(new WorkflowStep('unit.step.2', async () => true));

  const unitResult = await unit.execute();

  assert(unitResult.committed === true, 'unit of work did not commit');
  assert(unit.completed.length === 2, 'unit completed step count mismatch');

  let compensationExecuted = false;

  const failingUnit = new UnitOfWork(workflowContext);

  failingUnit.addCompensation(async () => {
    compensationExecuted = true;
  });

  failingUnit.addStep(new WorkflowStep('success.before.failure', async () => true));
  failingUnit.addStep(new WorkflowStep('failure.step', async () => {
    throw new Error('expected failure');
  }));

  try {
    await failingUnit.execute();
    throw new Error('failing unit should not commit');
  } catch (error) {
    assert(error instanceof WorkflowExecutionError, 'wrong workflow error type');
    assert(compensationExecuted === true, 'compensation not executed');
    assert(failingUnit.rolledBack === true, 'unit was not rolled back');
  }

  const workflow = new EnterpriseWorkflow(workflowContext);

  workflow.addStep(new WorkflowStep('workflow.step.1', async () => true));
  workflow.addStep(new WorkflowStep('workflow.step.2', async () => true));

  const workflowResult = await workflow.execute();

  assert(workflowResult.committed === true, 'workflow did not commit');

  assert(typeof enterpriseWorkflowMiddleware === 'function', 'workflow middleware not exported');
  assert(core.workflow, 'workflow not exported from core');
  assert(typeof core.workflow.EnterpriseWorkflow === 'function', 'core workflow export invalid');

  console.log('✅ Enterprise Workflow verification passed');
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
