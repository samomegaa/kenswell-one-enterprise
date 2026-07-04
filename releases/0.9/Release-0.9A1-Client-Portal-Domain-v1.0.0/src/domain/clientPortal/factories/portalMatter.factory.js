

// src/domain/clientPortal/factories/portalMatter.factory.js

const { MATTER_STATUS } = require('../constants/clientPortal.constants');

function createPortalMatter({
  id,
  firmId,
  clientId,
  matterId,
  title,
  reference,
  status = MATTER_STATUS.OPEN,
  summary = null,
  assignedUserId = null,
  createdAt = new Date(),
}) {
  if (!firmId) throw new Error('Portal matter requires firmId');
  if (!clientId) throw new Error('Portal matter requires clientId');
  if (!matterId) throw new Error('Portal matter requires matterId');
  if (!title) throw new Error('Portal matter requires title');

  return {
    id,
    firmId,
    clientId,
    matterId,
    title,
    reference,
    status,
    summary,
    assignedUserId,
    createdAt,
    updatedAt: createdAt,
  };
}

module.exports = { createPortalMatter };
