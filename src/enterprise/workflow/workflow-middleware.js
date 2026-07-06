const { createWorkflowContext } = require('./workflow-context');

function enterpriseWorkflowMiddleware(options = {}) {
  const workflowName = options.workflowName || 'http.request';

  return function attachEnterpriseWorkflow(req, res, next) {
    try {
      if (!req.enterpriseContext) {
        return next();
      }

      req.workflowContext = createWorkflowContext({
        enterpriseContext: req.enterpriseContext,
        auditContext: req.auditContext || null,
        workflowName,
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
  enterpriseWorkflowMiddleware,
};
