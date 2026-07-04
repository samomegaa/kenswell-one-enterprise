const AuditService = require('./AuditService');

const auditService = new AuditService();

function auditEvent(event, buildData = null) {
  return async function auditEventMiddleware(req, res, next) {
    res.on('finish', async () => {
      try {
        if (res.statusCode >= 200 && res.statusCode < 400) {
          const data = typeof buildData === 'function' ? buildData(req, res) : {};
          await auditService.logFromRequest(req, event, data);
        }
      } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
          console.error('Audit logging failed:', error.message);
        }
      }
    });

    return next();
  };
}

module.exports = auditEvent;
