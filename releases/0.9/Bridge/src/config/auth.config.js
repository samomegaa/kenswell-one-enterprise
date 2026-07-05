const {
  required,
  optional,
  number,
} = require('./validation');

function authConfig(env = process.env) {
  const clientPortalJwtSecret = required(env, 'CLIENT_PORTAL_JWT_SECRET');

  if (clientPortalJwtSecret.length < 16) {
    throw new Error('CLIENT_PORTAL_JWT_SECRET must be at least 16 characters');
  }

  return {
    clientPortalJwtSecret,
    clientPortalJwtExpiresIn: optional(env, 'CLIENT_PORTAL_JWT_EXPIRES_IN', '8h'),
    invitationTokenBytes: number(env, 'CLIENT_PORTAL_INVITATION_TOKEN_BYTES', 32),
  };
}

module.exports = authConfig;
