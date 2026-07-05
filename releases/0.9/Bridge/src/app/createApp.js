const express = require('express');

const clientPortalRoutes = require('../routes/clientPortal');
const {
  errorHandler,
} = require('../http');

const {
  securityHeaders,
  corsGuard,
} = require('../security');

const {
  HealthService,
  createHealthRouter,
} = require('../health');

function createApp({ config }) {
  const app = express();

  const healthService = new HealthService({ config });

  app.set('trust proxy', config.app.trustProxy);

  app.use(securityHeaders);
  app.use(corsGuard({ allowedOrigins: config.security.allowedOrigins }));
  app.use(express.json({ limit: config.security.maxJsonBodySize }));

  app.use(createHealthRouter(healthService));
  app.use(config.clientPortal.apiBasePath, clientPortalRoutes);

  app.use(errorHandler);

  app.locals.healthService = healthService;

  return app;
}

module.exports = createApp;
