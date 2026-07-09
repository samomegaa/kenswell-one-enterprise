const { defaultEnterpriseLogger } = require('./logger');

function enterpriseLoggingMiddleware(logger = defaultEnterpriseLogger) {
  return function attachEnterpriseLogging(req, res, next) {
    req.logger = logger;

    logger.info('request.started', {
      enterpriseContext: req.enterpriseContext || null,
      workflowContext: req.workflowContext || null,
      transactionBoundary: req.transactionBoundary || null,
      metadata: {
        method: req.method,
        path: req.originalUrl || req.url,
      },
    });

    res.on('finish', () => {
      logger.info('request.completed', {
        enterpriseContext: req.enterpriseContext || null,
        workflowContext: req.workflowContext || null,
        transactionBoundary: req.transactionBoundary || null,
        metadata: {
          method: req.method,
          path: req.originalUrl || req.url,
          statusCode: res.statusCode,
        },
      });
    });

    return next();
  };
}

module.exports = {
  enterpriseLoggingMiddleware,
};
