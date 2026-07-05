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

const {
  respond,
} = require('../../http');

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

      return respond.created(res, { document });
    } catch (error) {
      return respond.failure(res, error);
    }
  }

  async listClientDocuments(req, res) {
    try {
      const documents = await portalDocumentService.listClientDocuments(
        req.clientPortal.clientId
      );

      return respond.success(res, { documents });
    } catch (error) {
      return respond.failure(res, error);
    }
  }

  async listMatterDocuments(req, res) {
    try {
      const documents = await portalDocumentService.listClientVisibleMatterDocuments(
        req.params.matterId
      );

      return respond.success(res, { documents });
    } catch (error) {
      return respond.failure(res, error);
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

      return respond.success(res, { document });
    } catch (error) {
      return respond.failure(res, error);
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

      return respond.success(res, { document });
    } catch (error) {
      return respond.failure(res, error);
    }
  }

  async approveDocument(req, res) {
    try {
      const document = await portalDocumentService.approveDocument(
        req.params.documentId,
        req.body.reviewedByUserId
      );

      return respond.success(res, { document });
    } catch (error) {
      return respond.failure(res, error);
    }
  }

  async rejectDocument(req, res) {
    try {
      const document = await portalDocumentService.rejectDocument(
        req.params.documentId,
        req.body.reviewedByUserId
      );

      return respond.success(res, {
        document,
        reason: req.body.reason || null,
      });
    } catch (error) {
      return respond.failure(res, error);
    }
  }
}

module.exports = new ClientPortalDocumentController();
