export const AutomationRuleStatus = Object.freeze({
  DRAFT: 'DRAFT',
  ENABLED: 'ENABLED',
  DISABLED: 'DISABLED',
  ARCHIVED: 'ARCHIVED'
});

export const AutomationTriggerType = Object.freeze({
  EVENT: 'EVENT',
  SCHEDULED: 'SCHEDULED',
  MANUAL: 'MANUAL'
});

export const AutomationConditionOperator = Object.freeze({
  EQUALS: 'EQUALS',
  NOT_EQUALS: 'NOT_EQUALS',
  CONTAINS: 'CONTAINS',
  EXISTS: 'EXISTS'
});

export const AutomationActionType = Object.freeze({
  START_WORKFLOW: 'START_WORKFLOW',
  ASSIGN_WORKFLOW: 'ASSIGN_WORKFLOW',
  NOTIFY_USER: 'NOTIFY_USER',
  CREATE_TASK: 'CREATE_TASK',
  UPDATE_MATTER: 'UPDATE_MATTER'
});

export const AutomationExecutionStatus = Object.freeze({
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
  SKIPPED: 'SKIPPED'
});
