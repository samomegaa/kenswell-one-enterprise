const NOTIFICATION_CHANNELS = Object.freeze({
  EMAIL: 'email',
  IN_APP: 'in_app',
  SMS: 'sms',
});

const NOTIFICATION_STATUS = Object.freeze({
  PENDING: 'pending',
  SENT: 'sent',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
});

const NOTIFICATION_TYPES = Object.freeze({
  CLIENT_INVITATION: 'client_invitation',
  CLIENT_INVITATION_RESENT: 'client_invitation_resent',
  DOCUMENT_REQUESTED: 'document_requested',
  DOCUMENT_UPLOADED: 'document_uploaded',
  MESSAGE_RECEIVED: 'message_received',
  SYSTEM_ALERT: 'system_alert',
});

module.exports = {
  NOTIFICATION_CHANNELS,
  NOTIFICATION_STATUS,
  NOTIFICATION_TYPES,
};
