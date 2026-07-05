const {
  portalDocumentRepository,
  portalMessageRepository,
} = require('../../repositories/clientPortal');

const {
  notificationRepository,
} = require('../../repositories/notifications');

const {
  auditLogRepository,
} = require('../../repositories/audit');

const {
  clientTaskRepository,
} = require('../../repositories/tasks');

const {
  clientApprovalRepository,
} = require('../../repositories/approvals');

class ClientPortalActivityService {
  async getClientActivity({ clientId, limit = 50 }) {
    const [documents, messages, notifications, auditLogs, tasks, approvals] = await Promise.all([
      portalDocumentRepository.findByClientId(clientId),
      portalMessageRepository.findByClientId(clientId),
      notificationRepository.findByClient(clientId),
      auditLogRepository.findByClient(clientId),
      clientTaskRepository.findByClient(clientId),
      clientApprovalRepository.findByClient(clientId),
    ]);

    const documentEvents = documents.map((document) => ({
      id: `document:${document.id}`,
      type: 'document',
      event: `document_${document.status}`,
      title: document.title,
      resourceType: 'portal_document',
      resourceId: document.id,
      matterId: document.matterId,
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
      matterId: message.matterId,
      createdAt: message.createdAt,
      metadata: {
        senderType: message.senderType,
        status: message.status,
      },
    }));

    const notificationEvents = notifications.map((notification) => ({
      id: `notification:${notification.id}`,
      type: 'notification',
      event: notification.type,
      title: notification.subject || notification.type,
      resourceType: 'notification',
      resourceId: notification.id,
      matterId: notification.payload?.matterId || null,
      createdAt: notification.createdAt,
      metadata: {
        channel: notification.channel,
        status: notification.status,
      },
    }));

    const taskEvents = tasks.map((task) => ({
      id: `task:${task.id}`,
      type: 'task',
      event: `task_${task.status}`,
      title: task.title,
      resourceType: 'client_task',
      resourceId: task.id,
      matterId: task.matterId,
      createdAt: task.updatedAt || task.createdAt,
      metadata: {
        status: task.status,
        priority: task.priority,
        dueAt: task.dueAt,
      },
    }));

    const approvalEvents = approvals.map((approval) => ({
      id: `approval:${approval.id}`,
      type: 'approval',
      event: `approval_${approval.status}`,
      title: approval.title,
      resourceType: 'client_approval',
      resourceId: approval.id,
      matterId: approval.matterId,
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
      matterId: log.metadata?.matterId || null,
      createdAt: log.createdAt,
      metadata: log.metadata || {},
    }));

    return [
      ...documentEvents,
      ...messageEvents,
      ...notificationEvents,
      ...taskEvents,
      ...approvalEvents,
      ...auditEvents,
    ]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, Number(limit) || 50);
  }
}

module.exports = ClientPortalActivityService;
