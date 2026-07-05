const crypto = require('crypto');

const {
  fileAssetRepository,
} = require('../repositories/files');

const NullStorageProvider = require('./providers/NullStorageProvider');

const {
  FILE_STATUS,
  FILE_VISIBILITY,
  ALLOWED_FILE_MIME_TYPES,
  MAX_FILE_SIZE_BYTES,
} = require('./file.constants');

class FileUploadService {
  constructor({ storageProvider = new NullStorageProvider() } = {}) {
    this.storageProvider = storageProvider;
  }

  validateFile({ mimeType, sizeBytes }) {
    if (!ALLOWED_FILE_MIME_TYPES.includes(mimeType)) {
      throw new Error(`Unsupported file type: ${mimeType}`);
    }

    if (Number(sizeBytes) > MAX_FILE_SIZE_BYTES) {
      throw new Error('File exceeds maximum permitted size');
    }
  }

  buildStorageKey({ firmId, clientId, matterId, documentId, originalName }) {
    const safeName = String(originalName).replace(/[^a-zA-Z0-9._-]/g, '_');
    const nonce = crypto.randomBytes(12).toString('hex');

    return [
      'firms',
      firmId,
      'clients',
      clientId || 'none',
      'matters',
      matterId || 'none',
      'documents',
      documentId || 'none',
      `${nonce}_${safeName}`,
    ].join('/');
  }

  async prepareUpload(data) {
    this.validateFile({
      mimeType: data.mimeType,
      sizeBytes: data.sizeBytes,
    });

    const storageKey = this.buildStorageKey(data);

    const fileAsset = await fileAssetRepository.create({
      firmId: data.firmId,
      clientId: data.clientId || null,
      matterId: data.matterId || null,
      documentId: data.documentId || null,
      storageProvider: this.storageProvider.name,
      storageKey,
      originalName: data.originalName,
      mimeType: data.mimeType,
      sizeBytes: data.sizeBytes,
      visibility: data.visibility || FILE_VISIBILITY.PRIVATE,
      status: FILE_STATUS.PENDING_UPLOAD,
      uploadedByType: data.uploadedByType || null,
      uploadedById: data.uploadedById || null,
    });

    const upload = await this.storageProvider.createUploadUrl({
      storageKey,
      mimeType: data.mimeType,
    });

    return {
      fileAsset,
      upload,
    };
  }

  async confirmUpload(fileAssetId, { checksum = null } = {}) {
    const fileAsset = await fileAssetRepository.update(fileAssetId, {
      status: FILE_STATUS.UPLOADED,
      checksum,
      uploadedAt: new Date(),
    });

    return fileAsset;
  }

  async getDownloadUrl(fileAssetId) {
    const fileAsset = await fileAssetRepository.findById(fileAssetId);

    if (!fileAsset) {
      throw new Error('File asset not found');
    }

    if (fileAsset.status !== FILE_STATUS.UPLOADED) {
      throw new Error('File is not available for download');
    }

    const download = await this.storageProvider.createDownloadUrl({
      storageKey: fileAsset.storageKey,
    });

    return {
      fileAsset,
      download,
    };
  }
}

module.exports = FileUploadService;
