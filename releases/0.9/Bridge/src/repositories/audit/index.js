const models = require('../../database/models');
const AuditLogRepository = require('./AuditLogRepository');

module.exports = {
  auditLogRepository: new AuditLogRepository(models),
};
