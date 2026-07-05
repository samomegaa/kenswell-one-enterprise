const {
  getConfig,
} = require('../config');

const {
  createApp,
} = require('../app');

function startServer({ config = getConfig(), logger = console } = {}) {
  const app = createApp({ config });

  const server = app.listen(config.app.port, () => {
    app.locals.healthService.markReady();

    logger.log(JSON.stringify({
      level: 'info',
      event: 'server_started',
      port: config.app.port,
      environment: config.app.environment,
      timestamp: new Date().toISOString(),
    }));
  });

  function shutdown(signal = 'unknown') {
    app.locals.healthService.markNotReady();

    logger.log(JSON.stringify({
      level: 'info',
      event: 'server_shutdown_started',
      signal,
      timestamp: new Date().toISOString(),
    }));

    server.close(() => {
      logger.log(JSON.stringify({
        level: 'info',
        event: 'server_shutdown_complete',
        signal,
        timestamp: new Date().toISOString(),
      }));

      process.exit(0);
    });

    setTimeout(() => {
      logger.error(JSON.stringify({
        level: 'error',
        event: 'server_shutdown_forced',
        signal,
        timestamp: new Date().toISOString(),
      }));

      process.exit(1);
    }, 10000).unref();
  }

  process.once('SIGTERM', () => shutdown('SIGTERM'));
  process.once('SIGINT', () => shutdown('SIGINT'));

  return {
    app,
    server,
    shutdown,
  };
}

module.exports = startServer;
