

// src/domain/clientPortal/factories/portalAccount.factory.js

const {
  PORTAL_ACCOUNT_STATUS,
} = require('../constants/clientPortal.constants');

function createPortalAccount({
  id,
  firmId,
  clientId,
  email,
  status = PORTAL_ACCOUNT_STATUS.INVITED,
  invitedByUserId,
  invitedAt = new Date(),
  lastLoginAt = null,
}) {
  if (!firmId) throw new Error('Portal account requires firmId');
  if (!clientId) throw new Error('Portal account requires clientId');
  if (!email) throw new Error('Portal account requires email');

  return {
    id,
    firmId,
    clientId,
    email: email.toLowerCase(),
    status,
    invitedByUserId,
    invitedAt,
    activatedAt: null,
    lastLoginAt,
    createdAt: invitedAt,
    updatedAt: invitedAt,
  };
}

module.exports = { createPortalAccount };
