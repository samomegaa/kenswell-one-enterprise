const {
  optional,
  number,
  csv,
} = require('./validation');

function securityConfig(env = process.env) {
  return {
    allowedOrigins: csv(env, 'CLIENT_PORTAL_ALLOWED_ORIGINS', []),
    maxJsonBodySize: optional(env, 'MAX_JSON_BODY_SIZE', '1mb'),
    rateLimitWindowMs: number(env, 'RATE_LIMIT_WINDOW_MS', 15 * 60 * 1000),
    rateLimitMax: number(env, 'RATE_LIMIT_MAX', 100),
    authRateLimitMax: number(env, 'AUTH_RATE_LIMIT_MAX', 10),
  };
}

module.exports = securityConfig;
