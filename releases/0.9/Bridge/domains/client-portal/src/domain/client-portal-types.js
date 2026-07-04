export const PortalAccessStatus = Object.freeze({
  INVITED: 'INVITED',
  ACTIVE: 'ACTIVE',
  SUSPENDED: 'SUSPENDED',
  REVOKED: 'REVOKED'
});

export const ClientTaskStatus = Object.freeze({
  OPEN: 'OPEN',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
});

export const ClientApprovalStatus = Object.freeze({
  REQUESTED: 'REQUESTED',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  CHANGES_REQUESTED: 'CHANGES_REQUESTED'
});

export const ClientActivityType = Object.freeze({
  LOGIN: 'LOGIN',
  DOCUMENT_UPLOADED: 'DOCUMENT_UPLOADED',
  TASK_COMPLETED: 'TASK_COMPLETED',
  APPROVAL_DECIDED: 'APPROVAL_DECIDED',
  MESSAGE_SENT: 'MESSAGE_SENT'
});
