export const OrchestrationEvents = Object.freeze({
  PLAN_CREATED: 'orchestration.plan.created',
  PLAN_ACTIVATED: 'orchestration.plan.activated',

  EXECUTION_STARTED: 'orchestration.execution.started',
  EXECUTION_COMPLETED: 'orchestration.execution.completed',
  EXECUTION_FAILED: 'orchestration.execution.failed',

  STEP_STARTED: 'orchestration.step.started',
  STEP_COMPLETED: 'orchestration.step.completed',
  STEP_FAILED: 'orchestration.step.failed',

  CHECKPOINT_RECORDED: 'orchestration.checkpoint.recorded',

  WAIT_STARTED: 'orchestration.wait.started',
  WAIT_RESUMED: 'orchestration.wait.resumed',

  APPROVAL_REQUESTED: 'orchestration.approval.requested',
  APPROVAL_APPROVED: 'orchestration.approval.approved',
  APPROVAL_REJECTED: 'orchestration.approval.rejected',

  SLA_WARNING: 'orchestration.sla.warning',
  SLA_BREACHED: 'orchestration.sla.breached',
  SLA_ESCALATED: 'orchestration.sla.escalated',

  DEADLINE_MONITORED: 'orchestration.deadline.monitored',
  DEADLINE_MET: 'orchestration.deadline.met'
});
