export const RECOVERY_STATUS = Object.freeze({
  PLANNED: 'planned',
  APPROVAL_REQUIRED: 'approval-required',
  BLOCKED: 'blocked',
});

export const RECOVERY_STRATEGY = Object.freeze({
  RETRY: 'retry',
  RESTART: 'restart',
  ROLLBACK: 'rollback',
  DEGRADE: 'graceful-degradation',
  ESCALATE: 'escalate',
});
