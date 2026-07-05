const {
  portalDocumentService,
} = require('../../services/clientPortal');

const {
  auditService,
  AUDIT_EVENTS,
  AUDIT_ACTOR_TYPES,
} = require('../../audit');

const {
  notificationService,
  NOTIFICATION_TYPES,
} = require('../../notifications');

class ClientPortalDocumentController {
  async requestDocument(req, res) {
    try {
      const document = await portalDocumentService.requestDocument(req.body);

      await auditService.logFromRequest(req, AUDIT_EVENTS.DOCUMENT_REQUESTED, {
        actorType: AUDIT_ACTOR_TYPES.STAFF,
        firmId: document.firmId,
        clientId: document.clientId,
        resourceType: 'portal_document',
        resourceId: document.id,
      });

      await notificationService.queueEmail({
        firmId: document.firmId,
        clientId: document.clientId,
        recipientType: 'client',
        recipientId: document.clientId,
        type: NOTIFICATION_TYPES.DOCUMENT_REQUESTED,
        subject: 'Document requested',
        template: 'document_requested',
        payload: {
          documentId: document.id,
          title: document.title,
          matterId: document.matterId,
        },
      });

      return res.status(201).json({ document });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async listClientDocuments(req, res) {
    try {
      const documents = await portalDocumentService.listClientDocuments(
        req.clientPortal.clientId
      );

      return res.json({ documents });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async listMatterDocuments(req, res) {
    try {
      const documents = await portalDocumentService.listClientVisibleMatterDocuments(
        req.params.matterId
      );

      return res.json({ documents });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async uploadDocumentMetadata(req, res) {
    try {
      const document = await portalDocumentService.uploadDocument(
        req.params.documentId,
        req.body
      );

      await auditService.logFromRequest(req, AUDIT_EVENTS.DOCUMENT_UPLOADED, {
        actorType: AUDIT_ACTOR_TYPES.CLIENT,
        clientId: req.clientPortal.clientId,
        resourceType: 'portal_document',
        resourceId: document.id,
      });

      await notificationService.queueInApp({
        firmId: document.firmId,
        clientId: document.clientId,
        recipientType: 'staff',
        type: NOTIFICATION_TYPES.DOCUMENT_UPLOADED,
        subject: 'Client uploaded a document',
        template: 'document_uploaded',
        payload: {
          documentId: document.id,
          title: document.title,
          matterId: document.matterId,
        },
      });

      return res.json({ document });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async reviewDocument(req, res) {
    try {
      const document = await portalDocumentService.reviewDocument(
        req.params.documentId,
        req.body.reviewedByUserId
      );

      await auditService.logFromRequest(req, AUDIT_EVENTS.DOCUMENT_REVIEWED, {
        actorType: AUDIT_ACTOR_TYPES.STAFF,
        firmId: document.firmId,
        clientId: document.clientId,
        resourceType: 'portal_document',
        resourceId: document.id,
      });

      return res.json({ document });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async approveDocument(req, res) {
    try {
      const document = await portalDocumentService.approveDocument(
        req.params.documentId,
        req.body.reviewedByUserId
      );

      return res.json({ document });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async rejectDocument(req, res) {
    try {
      const document = await portalDocumentService.rejectDocument(
        req.params.documentId,
        req.body.reviewedByUserId
      );

      return res.json({
        document,
        reason: req.body.reason || null,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new ClientPortalDocumentController();
