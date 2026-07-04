const crypto = require('crypto');
const jwt = require('jsonwebtoken');

function generateInvitationToken() {
  return crypto.randomBytes(32).toString('hex');
}

function signClientPortalToken(payload, options = {}) {
  const secret = process.env.CLIENT_PORTAL_JWT_SECRET || process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('CLIENT_PORTAL_JWT_SECRET or JWT_SECRET is required');
  }

  return jwt.sign(payload, secret, {
    expiresIn: options.expiresIn || '8h',
    issuer: 'kenswell-one',
    audience: 'client-portal',
  });
}

function verifyClientPortalToken(token) {
  const secret = process.env.CLIENT_PORTAL_JWT_SECRET || process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('CLIENT_PORTAL_JWT_SECRET or JWT_SECRET is required');
  }

  return jwt.verify(token, secret, {
    issuer: 'kenswell-one',
    audience: 'client-portal',
  });
}

module.exports = {
  generateInvitationToken,
  signClientPortalToken,
  verifyClientPortalToken,
};
