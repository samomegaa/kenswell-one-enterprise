const {
  portalDocumentRepository,
} = require('../../repositories/clientPortal');

const {
  portalMessageRepository,
} = require('../../repositories/clientPortal');

const {
  notificationRepository,
} = require('../../repositories/notifications');

const {
  auditLogRepository,
} = require('../../repositories/audit');

const {
  clientApprovalRepository,
} = require('../../repositories/approvals');

class MatterTimelineService {
  async getMatterTimeline({ clientId, matterId, limit = 50 }) {
    const [documents, messages, notifications, auditLogs, approvals] = await Promise.all([
      portalDocumentRepository.findByMatterId(matterId),
      portalMessageRepository.findByMatterId(matterId),
      notificationRepository.findByClient(clientId),
      auditLogRepository.findByResource('portal_matter', matterId),
      clientApprovalRepository.findByMatter(matterId),
    ]);

    const documentEvents = documents.map((document) => ({
      id: `document:${document.id}`,
      type: 'document',
      event: `document_${document.status}`,
      title: document.title,
      resourceType: 'portal_document',
      resourceId: document.id,
      createdAt: document.updatedAt || document.createdAt,
      metadata: {
        status: document.status,
        fileName: document.fileName,
        visibility: document.visibility,
      },
    }));

    const messageEvents = messages.map((message) => ({
      id: `message:${message.id}`,
      type: 'message',
      event: 'message_sent',
      title: message.subject || 'Secure message',
      resourceType: 'portal_message',
      resourceId: message.id,
      createdAt: message.createdAt,
      metadata: {
        senderType: message.senderType,
        status: message.status,
      },
    }));

    const notificationEvents = notifications
      .filter((notification) => notification.payload && notification.payload.matterId === matterId)
      .map((notification) => ({
        id: `notification:${notification.id}`,
        type: 'notification',
        event: notification.type,
        title: notification.subject || notification.type,
        resourceType: 'notification',
        resourceId: notification.id,
        createdAt: notification.createdAt,
        metadata: {
          channel: notification.channel,
          status: notification.status,
        },
      }));

    const approvalEvents = approvals.map((approval) => ({
      id: `approval:${approval.id}`,
      type: 'approval',
      event: `approval_${approval.status}`,
      title: approval.title,
      resourceType: 'client_approval',
      resourceId: approval.id,
      createdAt: approval.updatedAt || approval.createdAt,
      metadata: {
        status: approval.status,
        approvalType: approval.type,
        documentId: approval.documentId,
      },
    }));

    const auditEvents = auditLogs.map((log) => ({
      id: `audit:${log.id}`,
      type: 'audit',
      event: log.event,
      title: log.event,
      resourceType: log.resourceType,
      resourceId: log.resourceId,
      createdAt: log.createdAt,
      metadata: log.metadata || {},
    }));

    return [...documentEvents, ...messageEvents, ...notificationEvents, ...approvalEvents, ...auditEvents]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, limit);
  }
}

module.exports = MatterTimelineService;
