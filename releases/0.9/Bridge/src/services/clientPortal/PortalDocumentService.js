const {
  portalDocumentRepository,
} = require('../../repositories/clientPortal');

class PortalDocumentService {
  async requestDocument(data) {
    return portalDocumentRepository.create({
      ...data,
      status: 'requested',
      visibility: data.visibility || 'client_visible',
    });
  }

  async listClientDocuments(clientId) {
    return portalDocumentRepository.findByClientId(clientId);
  }

  async listMatterDocuments(matterId) {
    return portalDocumentRepository.findByMatterId(matterId);
  }

  async listClientVisibleMatterDocuments(matterId) {
    return portalDocumentRepository.findClientVisibleByMatterId(matterId);
  }

  async listRequestedDocuments(clientId) {
    return portalDocumentRepository.findRequestedByClientId(clientId);
  }

  async uploadDocument(documentId, fileData) {
    return portalDocumentRepository.markUploaded(documentId, fileData);
  }

  async reviewDocument(documentId, reviewedByUserId) {
    return portalDocumentRepository.markReviewed(documentId, reviewedByUserId);
  }

  async approveDocument(documentId, reviewedByUserId) {
    return portalDocumentRepository.update(documentId, {
      status: 'approved',
      reviewedByUserId,
      reviewedAt: new Date(),
    });
  }

  async rejectDocument(documentId, reviewedByUserId) {
    return portalDocumentRepository.update(documentId, {
      status: 'rejected',
      reviewedByUserId,
      reviewedAt: new Date(),
    });
  }
}

module.exports = PortalDocumentService;
