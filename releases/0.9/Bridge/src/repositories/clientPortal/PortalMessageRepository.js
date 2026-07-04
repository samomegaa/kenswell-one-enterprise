const BaseRepository = require('../BaseRepository');

class PortalMessageRepository extends BaseRepository {
  constructor(models) {
    super(models.PortalMessage);
  }

  findByClientId(clientId, options = {}) {
    return this.findAll({ clientId }, options);
  }

  findByMatterId(matterId, options = {}) {
    return this.findAll(
      { matterId },
      {
        order: [['createdAt', 'ASC']],
        ...options,
      }
    );
  }

  findUnreadByClientId(clientId, options = {}) {
    return this.findAll({
      clientId,
      status: 'sent',
    }, options);
  }

  markRead(id, options = {}) {
    return this.update(id, {
      status: 'read',
      readAt: new Date(),
    }, options);
  }

  archive(id, options = {}) {
    return this.update(id, {
      status: 'archived',
    }, options);
  }
}

module.exports = PortalMessageRepository;
