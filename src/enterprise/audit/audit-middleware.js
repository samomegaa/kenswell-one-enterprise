const { createAuditContext } = require('./audit-context');
const { defaultAuditProvider } = require('./audit-provider');
const { AuditEvents } = require('./audit-events');

function enterpriseAuditMiddleware(provider = defaultAuditProvider) {
  return function attachEnterpriseAudit(req, res, next) {
    const startedAt = Date.now();

    try {
      if (req.enterpriseContext) {
        const startAudit = createAuditContext({
          enterpriseContext: req.enterpriseContext,
          event: AuditEvents.REQUEST_STARTED,
          action: 'request.started',
          entity: 'http.request',
          entityId: req.enterpriseContext.requestId,
          metadata: {
            method: req.method,
            path: req.originalUrl || req.url,
          },
        });

        provider.record(startAudit);
      }

      res.on('finish', () => {
        if (!req.enterpriseContext) return;

        const completionEvent =
          res.statusCode >= 500
            ? AuditEvents.REQUEST_FAILED
            : AuditEvents.REQUEST_COMPLETED;

        const completionAudit = createAuditContext({
          enterpriseContext: req.enterpriseContext,
          event: completionEvent,
          action: completionEvent,
          entity: 'http.request',
          entityId: req.enterpriseContext.requestId,
          metadata: {
            method: req.method,
            path: req.originalUrl || req.url,
            statusCode: res.statusCode,
            durationMs: Date.now() - startedAt,
          },
        });

        provider.record(completionAudit);
      });

      next();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = {
  enterpriseAuditMiddleware,
};
