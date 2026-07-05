const path = require('path');

const root = path.resolve(__dirname, '../../..');

const {
  createConfig,
} = require(path.join(root, 'src/config'));

const {
  createApp,
} = require(path.join(root, 'src/app'));

const http = require(path.join(root, 'src/http'));

for (const key of ['requestId', 'requestLogger', 'rateLimit']) {
  if (typeof http[key] !== 'function') {
    throw new Error(`Missing HTTP hardening helper: ${key}`);
  }
}

const lines = [];

const logger = {
  info(event, payload) {
    lines.push({ event, payload });
  },
};

const config = createConfig({
  NODE_ENV: 'test',
  DATABASE_URL: 'postgres://user:pass@localhost:5432/kenswell_one',
  CLIENT_PORTAL_JWT_SECRET: 'development-secret-long-enough',
  CLIENT_PORTAL_API_BASE_PATH: '/api/client-portal',
  MAX_JSON_BODY_SIZE: '512kb',
  RATE_LIMIT_WINDOW_MS: '60000',
  RATE_LIMIT_MAX: '50',
});

const app = createApp({ config, logger });

if (!app || typeof app.use !== 'function') {
  throw new Error('createApp did not return an Express app');
}

if (!app.locals.logger) {
  throw new Error('App did not expose runtime logger');
}

if (!app.locals.healthService) {
  throw new Error('App did not expose health service');
}

if (config.security.maxJsonBodySize !== '512kb') {
  throw new Error('Body limit config was not applied');
}

if (config.security.rateLimitMax !== 50) {
  throw new Error('Rate limit max was not parsed');
}

console.log('HTTP hardening baseline verified');
