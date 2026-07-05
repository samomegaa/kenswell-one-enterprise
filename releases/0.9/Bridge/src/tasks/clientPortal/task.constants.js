const CLIENT_TASK_STATUS = Object.freeze({
  OPEN: 'open',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  OVERDUE: 'overdue',
});

const CLIENT_TASK_PRIORITY = Object.freeze({
  LOW: 'low',
  NORMAL: 'normal',
  HIGH: 'high',
  URGENT: 'urgent',
});

const CLIENT_TASK_TYPES = Object.freeze({
  GENERAL: 'general',
  DOCUMENT_UPLOAD: 'document_upload',
  FORM_COMPLETION: 'form_completion',
  REVIEW_AND_CONFIRM: 'review_and_confirm',
  PAYMENT: 'payment',
});

module.exports = {
  CLIENT_TASK_STATUS,
  CLIENT_TASK_PRIORITY,
  CLIENT_TASK_TYPES,
};
