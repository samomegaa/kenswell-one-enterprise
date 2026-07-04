const BaseRepository = require('../BaseRepository');

class AuditLogRepository extends BaseRepository {
  constructor(models) {
    super(models.AuditLog);
  }

  findByFirm(firmId, options = {}) {
    return this.findAll({ firmId }, options);
  }

  findByClient(clientId, options = {}) {
    return this.findAll({ clientId }, options);
  }

  findByUser(userId, options = {}) {
    return this.findAll({ userId }, options);
  }

  findByEvent(event, options = {}) {
    return this.findAll({ event }, options);
  }

  findByResource(resourceType, resourceId, options = {}) {
    return this.findAll({ resourceType, resourceId }, options);
  }
}

module.exports = AuditLogRepository;
