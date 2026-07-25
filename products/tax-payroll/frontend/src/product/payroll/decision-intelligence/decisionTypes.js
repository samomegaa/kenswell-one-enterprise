export const DECISION_STRATEGY = Object.freeze({
  OBSERVE: 'observe',
  RETRY: 'retry',
  PAUSE: 'pause',
  ESCALATE: 'escalate',
  RECOVER: 'recover',
  RESUME: 'resume',
  ARCHIVE: 'archive',
  NOTIFY: 'notify',
});

export const DECISION_STATUS = Object.freeze({
  PROPOSED: 'proposed',
  APPROVAL_REQUIRED: 'approval-required',
  BLOCKED: 'blocked',
  ACCEPTED: 'accepted',
});
