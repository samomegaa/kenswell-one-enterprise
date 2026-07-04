

// src/domain/clientPortal/factories/client.factory.js

const { CLIENT_TYPES } = require('../constants/clientPortal.constants');

function createClient({
  id,
  firmId,
  type = CLIENT_TYPES.INDIVIDUAL,
  displayName,
  email,
  phone = null,
  reference = null,
  metadata = {},
  createdAt = new Date(),
}) {
  if (!firmId) throw new Error('Client requires firmId');
  if (!displayName) throw new Error('Client requires displayName');
  if (!email) throw new Error('Client requires email');

  return {
    id,
    firmId,
    type,
    displayName,
    email: email.toLowerCase(),
    phone,
    reference,
    metadata,
    createdAt,
    updatedAt: createdAt,
  };
}

module.exports = { createClient };
