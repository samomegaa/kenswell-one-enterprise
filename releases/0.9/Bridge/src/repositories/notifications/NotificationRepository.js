const BaseRepository = require('../BaseRepository');

class NotificationRepository extends BaseRepository {
  constructor(models) {
    super(models.Notification);
  }

  findByFirm(firmId, options = {}) {
    return this.findAll({ firmId }, options);
  }

  findByClient(clientId, options = {}) {
    return this.findAll({ clientId }, options);
  }

  findPending(options = {}) {
    return this.findAll({ status: 'pending' }, options);
  }

  findByRecipient(recipientType, recipientId, options = {}) {
    return this.findAll({ recipientType, recipientId }, options);
  }

  markSent(id, providerData = {}, options = {}) {
    return this.update(id, {
      status: 'sent',
      provider: providerData.provider || null,
      providerMessageId: providerData.providerMessageId || null,
      sentAt: new Date(),
      errorMessage: null,
    }, options);
  }

  markFailed(id, errorMessage, options = {}) {
    return this.update(id, {
      status: 'failed',
      errorMessage,
    }, options);
  }

  cancel(id, options = {}) {
    return this.update(id, {
      status: 'cancelled',
    }, options);
  }
}

module.exports = NotificationRepository;
