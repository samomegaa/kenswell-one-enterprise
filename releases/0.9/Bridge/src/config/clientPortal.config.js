const {
  optional,
} = require('./validation');

function clientPortalConfig(env = process.env) {
  return {
    publicUrl: optional(env, 'CLIENT_PORTAL_PUBLIC_URL', 'http://localhost:5174'),
    apiBasePath: optional(env, 'CLIENT_PORTAL_API_BASE_PATH', '/api/client-portal'),
  };
}

module.exports = clientPortalConfig;
