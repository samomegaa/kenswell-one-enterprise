export const OrchestrationEvents = Object.freeze({
  PLAN_CREATED: 'orchestration.plan.created',
  PLAN_ACTIVATED: 'orchestration.plan.activated',
  EXECUTION_STARTED: 'orchestration.execution.started',
  STEP_STARTED: 'orchestration.step.started',
  STEP_COMPLETED: 'orchestration.step.completed',
  STEP_FAILED: 'orchestration.step.failed',
  CHECKPOINT_RECORDED: 'orchestration.checkpoint.recorded',
  EXECUTION_COMPLETED: 'orchestration.execution.completed',
  EXECUTION_FAILED: 'orchestration.execution.failed',
  WAIT_STARTED: 'orchestration.wait.started',
  WAIT_RESUMED: 'orchestration.wait.resumed',
  APPROVAL_REJECTED: 'orchestration.approval.rejected',
  APPROVAL_APPROVED: 'orchestration.approval.approved',
  APPROVAL_REQUESTED: 'orchestration.approval.requested'
});
