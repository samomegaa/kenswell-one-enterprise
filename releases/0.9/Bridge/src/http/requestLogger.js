function requestLogger(logger = console) {
  return function requestLoggerMiddleware(req, res, next) {
    const startedAt = Date.now();

    res.on('finish', () => {
      const durationMs = Date.now() - startedAt;

      if (logger && typeof logger.info === 'function') {
        logger.info('http_request_completed', {
          requestId: req.requestId,
          method: req.method,
          path: req.originalUrl || req.url,
          statusCode: res.statusCode,
          durationMs,
        });
      }
    });

    return next();
  };
}

module.exports = requestLogger;
