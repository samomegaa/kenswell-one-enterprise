const {
  getConfig,
} = require('../config');

const {
  createApp,
} = require('../app');

const {
  createLogger,
} = require('../logging');

function startServer({ config = getConfig(), logger = null } = {}) {
  const runtimeLogger = logger || createLogger(config.logging);
  const app = createApp({ config, logger: runtimeLogger });

  const server = app.listen(config.app.port, () => {
    app.locals.healthService.markReady();

    runtimeLogger.info('server_started', {
      port: config.app.port,
      environment: config.app.environment,
    });
  });

  function shutdown(signal = 'unknown') {
    app.locals.healthService.markNotReady();

    runtimeLogger.info('server_shutdown_started', {
      signal,
    });

    server.close(() => {
      runtimeLogger.info('server_shutdown_complete', {
        signal,
      });

      process.exit(0);
    });

    setTimeout(() => {
      runtimeLogger.error('server_shutdown_forced', {
        signal,
      });

      process.exit(1);
    }, 10000).unref();
  }

  process.once('SIGTERM', () => shutdown('SIGTERM'));
  process.once('SIGINT', () => shutdown('SIGINT'));

  return {
    app,
    server,
    shutdown,
    logger: runtimeLogger,
  };
}

module.exports = startServer;
