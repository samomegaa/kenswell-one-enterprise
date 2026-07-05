const {
  REQUIRED_ENV_VARS,
} = require('./security.constants');

function validateEnvironment(env = process.env) {
  const missing = REQUIRED_ENV_VARS.filter((key) => !env[key]);

  if (missing.length) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  if ((env.CLIENT_PORTAL_JWT_SECRET || '').length < 16) {
    throw new Error('CLIENT_PORTAL_JWT_SECRET must be at least 16 characters');
  }

  return {
    valid: true,
    checked: REQUIRED_ENV_VARS,
  };
}

module.exports = validateEnvironment;
