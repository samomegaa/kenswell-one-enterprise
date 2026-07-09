// src/enterprise/context/context-middleware.js

const { resolveEnterpriseContext } = require('./context-resolver');

function enterpriseContextMiddleware() {
  return function attachEnterpriseContext(req, res, next) {
    try {
      const context = resolveEnterpriseContext(req);

      req.enterpriseContext = context;

      res.setHeader('x-request-id', context.requestId);
      res.setHeader('x-correlation-id', context.correlationId);
      res.setHeader('x-tenant-id', context.tenant.id);

      next();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = {
  enterpriseContextMiddleware,
};