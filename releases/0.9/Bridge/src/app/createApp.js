const express = require('express');

const clientPortalRoutes = require('../routes/clientPortal');

const {
  errorHandler,
  notFoundHandler,
  requestId,
  requestLogger,
  rateLimit,
  compressionMiddleware,
} = require('../http');

const {
  securityHeaders,
  corsGuard,
} = require('../security');

const {
  HealthService,
  createHealthRouter,
} = require('../health');

const {
  createLogger,
} = require('../logging');

function createApp({ config, logger = null }) {
  const app = express();
  const runtimeLogger = logger || createLogger(config.logging);

  const healthService = new HealthService({ config });

  app.set('trust proxy', config.app.trustProxy);

  app.use(requestId);
  app.use(requestLogger(runtimeLogger));
  app.use(securityHeaders);
  app.use(corsGuard({ allowedOrigins: config.security.allowedOrigins }));
  app.use(compressionMiddleware());

  app.use(express.json({ limit: config.security.maxJsonBodySize }));

  app.use(createHealthRouter(healthService));

  app.use(
    config.clientPortal.apiBasePath,
    rateLimit({
      windowMs: config.security.rateLimitWindowMs,
      max: config.security.rateLimitMax,
    }),
    clientPortalRoutes
  );

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.locals.healthService = healthService;
  app.locals.logger = runtimeLogger;

  return app;
}

module.exports = createApp;
