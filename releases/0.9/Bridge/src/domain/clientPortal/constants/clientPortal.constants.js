// src/domain/clientPortal/constants/clientPortal.constants.js

const CLIENT_TYPES = Object.freeze({
  INDIVIDUAL: 'individual',
  COMPANY: 'company',
  ORGANISATION: 'organisation',
});

const PORTAL_ACCOUNT_STATUS = Object.freeze({
  INVITED: 'invited',
  ACTIVE: 'active',
  SUSPENDED: 'suspended',
  CLOSED: 'closed',
});

const PORTAL_ROLE = Object.freeze({
  CLIENT_OWNER: 'client_owner',
  CLIENT_USER: 'client_user',
  VIEW_ONLY: 'view_only',
});

const MATTER_STATUS = Object.freeze({
  OPEN: 'open',
  ON_HOLD: 'on_hold',
  COMPLETED: 'completed',
  ARCHIVED: 'archived',
});

const DOCUMENT_STATUS = Object.freeze({
  REQUESTED: 'requested',
  UPLOADED: 'uploaded',
  UNDER_REVIEW: 'under_review',
  REVIEWED: 'reviewed',
  REJECTED: 'rejected',
  APPROVED: 'approved',
});

const DOCUMENT_VISIBILITY = Object.freeze({
  INTERNAL_ONLY: 'internal_only',
  CLIENT_VISIBLE: 'client_visible',
  CLIENT_UPLOADED: 'client_uploaded',
});

const MESSAGE_STATUS = Object.freeze({
  SENT: 'sent',
  DELIVERED: 'delivered',
  READ: 'read',
  ARCHIVED: 'archived',
});

const MESSAGE_SENDER_TYPE = Object.freeze({
  STAFF: 'staff',
  CLIENT: 'client',
  SYSTEM: 'system',
});

const PORTAL_AUDIT_ACTION = Object.freeze({
  CLIENT_CREATED: 'client_created',
  ACCOUNT_INVITED: 'account_invited',
  ACCOUNT_ACTIVATED: 'account_activated',
  MATTER_SHARED: 'matter_shared',
  DOCUMENT_REQUESTED: 'document_requested',
  DOCUMENT_UPLOADED: 'document_uploaded',
  DOCUMENT_REVIEWED: 'document_reviewed',
  MESSAGE_SENT: 'message_sent',
  LOGIN_SUCCESS: 'login_success',
  LOGIN_FAILED: 'login_failed',
});

module.exports = {
  CLIENT_TYPES,
  PORTAL_ACCOUNT_STATUS,
  PORTAL_ROLE,
  MATTER_STATUS,
  DOCUMENT_STATUS,
  DOCUMENT_VISIBILITY,
  MESSAGE_STATUS,
  MESSAGE_SENDER_TYPE,
  PORTAL_AUDIT_ACTION,
};
