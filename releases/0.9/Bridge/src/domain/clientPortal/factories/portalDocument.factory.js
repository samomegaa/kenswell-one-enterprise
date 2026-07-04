
// src/domain/clientPortal/factories/portalDocument.factory.js

const {
  DOCUMENT_STATUS,
} = require('../constants/clientPortal.constants');

function createPortalDocument({
  id,
  firmId,
  clientId,
  matterId,
  title,
  description = null,
  fileKey = null,
  fileName = null,
  mimeType = null,
  status = DOCUMENT_STATUS.REQUESTED,
  requestedByUserId = null,
  uploadedByClient = false,
  createdAt = new Date(),
}) {
  if (!firmId) throw new Error('Portal document requires firmId');
  if (!clientId) throw new Error('Portal document requires clientId');
  if (!matterId) throw new Error('Portal document requires matterId');
  if (!title) throw new Error('Portal document requires title');

  return {
    id,
    firmId,
    clientId,
    matterId,
    title,
    description,
    fileKey,
    fileName,
    mimeType,
    status,
    requestedByUserId,
    uploadedByClient,
    createdAt,
    updatedAt: createdAt,
  };
}

module.exports = { createPortalDocument };
