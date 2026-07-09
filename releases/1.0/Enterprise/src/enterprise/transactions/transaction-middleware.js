const { defaultTransactionManager } = require('./transaction-manager');

function enterpriseTransactionMiddleware(manager = defaultTransactionManager) {
  return function attachEnterpriseTransaction(req, res, next) {
    try {
      if (!req.enterpriseContext) {
        return next();
      }

      req.transactionBoundary = manager.begin({
        enterpriseContext: req.enterpriseContext,
        workflowContext: req.workflowContext || null,
        metadata: {
          method: req.method,
          path: req.originalUrl || req.url,
        },
      });

      return next();
    } catch (error) {
      return next(error);
    }
  };
}

module.exports = {
  enterpriseTransactionMiddleware,
};
