export const ApprovalStatus = Object.freeze({
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  EXPIRED: 'EXPIRED',
  CANCELLED: 'CANCELLED'
});

export const ApprovalDecisionType = Object.freeze({
  APPROVE: 'APPROVE',
  REJECT: 'REJECT',
  REQUEST_CHANGES: 'REQUEST_CHANGES'
});

export const WaitStateType = Object.freeze({
  APPROVAL: 'APPROVAL',
  CLIENT_RESPONSE: 'CLIENT_RESPONSE',
  EXTERNAL_EVENT: 'EXTERNAL_EVENT',
  SCHEDULE: 'SCHEDULE'
});
