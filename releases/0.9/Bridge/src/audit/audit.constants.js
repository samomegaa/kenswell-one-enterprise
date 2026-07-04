const AUDIT_ACTOR_TYPES = Object.freeze({
  STAFF: 'staff',
  CLIENT: 'client',
  SYSTEM: 'system',
});

const AUDIT_EVENTS = Object.freeze({
  CLIENT_INVITED: 'client_invited',
  CLIENT_INVITATION_RESENT: 'client_invitation_resent',
  CLIENT_ACCOUNT_ACTIVATED: 'client_account_activated',
  CLIENT_LOGIN_SUCCESS: 'client_login_success',
  CLIENT_LOGIN_FAILED: 'client_login_failed',
  CLIENT_PORTAL_VIEWED: 'client_portal_viewed',
  MATTER_VIEWED: 'matter_viewed',
  DOCUMENT_REQUESTED: 'document_requested',
  DOCUMENT_UPLOADED: 'document_uploaded',
  DOCUMENT_REVIEWED: 'document_reviewed',
  MESSAGE_SENT: 'message_sent',
});

module.exports = {
  AUDIT_ACTOR_TYPES,
  AUDIT_EVENTS,
};
