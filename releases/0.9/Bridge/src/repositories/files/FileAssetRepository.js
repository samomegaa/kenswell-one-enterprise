const BaseRepository = require('../BaseRepository');

class FileAssetRepository extends BaseRepository {
  constructor(models) {
    super(models.FileAsset);
  }

  findByStorageKey(storageKey, options = {}) {
    return this.findOne({ storageKey }, options);
  }

  findByDocument(documentId, options = {}) {
    return this.findAll({ documentId }, options);
  }

  findByMatter(matterId, options = {}) {
    return this.findAll({ matterId }, options);
  }

  markUploaded(id, options = {}) {
    return this.update(id, {
      status: 'uploaded',
      uploadedAt: new Date(),
    }, options);
  }

  markFailed(id, errorMessage, options = {}) {
    return this.update(id, {
      status: 'failed',
      checksum: errorMessage || null,
    }, options);
  }
}

module.exports = FileAssetRepository;
