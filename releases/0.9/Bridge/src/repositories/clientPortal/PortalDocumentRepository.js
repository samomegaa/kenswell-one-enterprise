const BaseRepository = require('../BaseRepository');

class PortalDocumentRepository extends BaseRepository {
  constructor(models) {
    super(models.PortalDocument);
  }

  findByClientId(clientId, options = {}) {
    return this.findAll({ clientId }, options);
  }

  findByMatterId(matterId, options = {}) {
    return this.findAll({ matterId }, options);
  }

  findClientVisibleByMatterId(matterId, options = {}) {
    return this.findAll({
      matterId,
      visibility: 'client_visible',
    }, options);
  }

  findRequestedByClientId(clientId, options = {}) {
    return this.findAll({
      clientId,
      status: 'requested',
    }, options);
  }

  markUploaded(id, fileData, options = {}) {
    return this.update(id, {
      ...fileData,
      status: 'uploaded',
      uploadedByClient: true,
    }, options);
  }

  markReviewed(id, reviewedByUserId, options = {}) {
    return this.update(id, {
      status: 'reviewed',
      reviewedByUserId,
      reviewedAt: new Date(),
    }, options);
  }
}

module.exports = PortalDocumentRepository;
