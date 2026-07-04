const AuditService = require('./AuditService');

module.exports = {
  auditService: new AuditService(),
  auditEvent: require('./audit.middleware'),
  ...require('./audit.constants'),
};
