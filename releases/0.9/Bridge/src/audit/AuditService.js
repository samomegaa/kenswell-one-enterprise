const {
  auditLogRepository,
} = require('../repositories/audit');

const {
  AUDIT_ACTOR_TYPES,
} = require('./audit.constants');

class AuditService {
  async log(event, data = {}) {
    if (!event) {
      throw new Error('Audit event is required');
    }

    return auditLogRepository.create({
      firmId: data.firmId || null,
      userId: data.userId || null,
      clientId: data.clientId || null,
      actorType: data.actorType || AUDIT_ACTOR_TYPES.SYSTEM,
      actorId: data.actorId || null,
      event,
      resourceType: data.resourceType || null,
      resourceId: data.resourceId || null,
      httpMethod: data.httpMethod || null,
      requestPath: data.requestPath || null,
      ipAddress: data.ipAddress || null,
      userAgent: data.userAgent || null,
      metadata: data.metadata || {},
    });
  }

  async logFromRequest(req, event, data = {}) {
    const clientPortal = req.clientPortal || {};

    return this.log(event, {
      firmId: data.firmId || clientPortal.firmId || null,
      userId: data.userId || null,
      clientId: data.clientId || clientPortal.clientId || null,
      actorType: data.actorType || (clientPortal.accountId ? AUDIT_ACTOR_TYPES.CLIENT : AUDIT_ACTOR_TYPES.SYSTEM),
      actorId: data.actorId || clientPortal.accountId || null,
      resourceType: data.resourceType || null,
      resourceId: data.resourceId || null,
      httpMethod: req.method,
      requestPath: req.originalUrl || req.url,
      ipAddress: req.ip || req.headers['x-forwarded-for'] || null,
      userAgent: req.headers['user-agent'] || null,
      metadata: data.metadata || {},
    });
  }
}

module.exports = AuditService;
