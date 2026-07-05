const {
  fileUploadService,
} = require('../../files');

const {
  portalDocumentService,
} = require('../../services/clientPortal');

const {
  auditService,
  AUDIT_EVENTS,
  AUDIT_ACTOR_TYPES,
} = require('../../audit');

class ClientPortalFileController {
  async prepareUpload(req, res) {
    try {
      const result = await fileUploadService.prepareUpload({
        ...req.body,
        uploadedByType: req.body.uploadedByType || 'client',
        uploadedById: req.body.uploadedById || req.clientPortal?.accountId || null,
      });

      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async confirmUpload(req, res) {
    try {
      const result = await fileUploadService.confirmUpload(
        req.params.fileAssetId,
        req.body
      );

      if (result.documentId) {
        await portalDocumentService.uploadDocument(result.documentId, {
          fileKey: result.storageKey,
          fileName: result.originalName,
          mimeType: result.mimeType,
          sizeBytes: result.sizeBytes,
        });
      }

      await auditService.logFromRequest(req, AUDIT_EVENTS.DOCUMENT_UPLOADED, {
        actorType: req.clientPortal ? AUDIT_ACTOR_TYPES.CLIENT : AUDIT_ACTOR_TYPES.SYSTEM,
        clientId: result.clientId,
        resourceType: 'file_asset',
        resourceId: result.id,
      });

      return res.json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async downloadUrl(req, res) {
    try {
      const result = await fileUploadService.getDownloadUrl(req.params.fileAssetId);

      return res.json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new ClientPortalFileController();
