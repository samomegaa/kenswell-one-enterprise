const path = require('path');

const root = path.resolve(__dirname, '../../..');

const {
  createConfig,
} = require(path.join(root, 'src/config'));

const {
  createApp,
} = require(path.join(root, 'src/app'));

const {
  HealthService,
  createHealthRouter,
} = require(path.join(root, 'src/health'));

const {
  startServer,
} = require(path.join(root, 'src/bootstrap'));

const config = createConfig({
  NODE_ENV: 'test',
  DATABASE_URL: 'postgres://user:pass@localhost:5432/kenswell_one',
  CLIENT_PORTAL_JWT_SECRET: 'development-secret-long-enough',
  CLIENT_PORTAL_API_BASE_PATH: '/api/client-portal',
});

const app = createApp({ config });

if (!app || typeof app.use !== 'function') {
  throw new Error('createApp did not return an Express app');
}

if (!app.locals.healthService) {
  throw new Error('App does not expose healthService');
}

const health = new HealthService({ config });

if (health.readiness().ready !== false) {
  throw new Error('Health service should start as not ready');
}

health.markReady();

if (health.readiness().ready !== true) {
  throw new Error('Health service did not mark ready');
}

if (typeof createHealthRouter !== 'function') {
  throw new Error('createHealthRouter must be a function');
}

if (typeof startServer !== 'function') {
  throw new Error('startServer must be a function');
}

console.log('Startup bootstrap and health baseline verified');
