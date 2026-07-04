export const OrchestrationPlanStatus = Object.freeze({
  DRAFT: 'DRAFT',
  ACTIVE: 'ACTIVE',
  DISABLED: 'DISABLED',
  ARCHIVED: 'ARCHIVED'
});

export const OrchestrationStepType = Object.freeze({
  ACTION: 'ACTION',
  WORKFLOW: 'WORKFLOW',
  AUTOMATION: 'AUTOMATION',
  DECISION: 'DECISION',
  WAIT: 'WAIT',
  APPROVAL: 'APPROVAL',
  PARALLEL: 'PARALLEL',
  ESCALATION: 'ESCALATION'
});

export const OrchestrationStepStatus = Object.freeze({
  PENDING: 'PENDING',
  ACTIVE: 'ACTIVE',
  WAITING: 'WAITING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  SKIPPED: 'SKIPPED'
});

export const OrchestrationExecutionStatus = Object.freeze({
  PENDING: 'PENDING',
  RUNNING: 'RUNNING',
  WAITING: 'WAITING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED'
});

export const OrchestrationDecisionOperator = Object.freeze({
  EQUALS: 'EQUALS',
  NOT_EQUALS: 'NOT_EQUALS',
  EXISTS: 'EXISTS',
  CONTAINS: 'CONTAINS',
  GREATER_THAN: 'GREATER_THAN',
  LESS_THAN: 'LESS_THAN'
});

export const OrchestrationOutcomeStatus = Object.freeze({
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
  PARTIAL: 'PARTIAL',
  SKIPPED: 'SKIPPED'
});
