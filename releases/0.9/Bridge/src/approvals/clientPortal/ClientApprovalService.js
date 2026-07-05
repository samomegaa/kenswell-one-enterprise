const {
  clientApprovalRepository,
} = require('../../repositories/approvals');

const {
  notificationService,
  NOTIFICATION_TYPES,
} = require('../../notifications');

const {
  auditService,
  AUDIT_ACTOR_TYPES,
} = require('../../audit');

const {
  CLIENT_APPROVAL_STATUS,
} = require('./approval.constants');

class ClientApprovalService {
  async createApproval(data) {
    const approval = await clientApprovalRepository.create({
      firmId: data.firmId,
      clientId: data.clientId,
      matterId: data.matterId || null,
      documentId: data.documentId || null,
      title: data.title,
      description: data.description || null,
      type: data.type || 'general',
      status: data.status || CLIENT_APPROVAL_STATUS.PENDING,
      requestedByUserId: data.requestedByUserId || null,
      expiresAt: data.expiresAt || null,
      metadata: data.metadata || {},
    });

    await notificationService.queueEmail({
      firmId: approval.firmId,
      clientId: approval.clientId,
      recipientType: 'client',
      recipientId: approval.clientId,
      type: NOTIFICATION_TYPES.SYSTEM_ALERT,
      subject: 'Approval requested',
      template: 'client_approval_requested',
      payload: {
        approvalId: approval.id,
        title: approval.title,
        matterId: approval.matterId,
        documentId: approval.documentId,
        expiresAt: approval.expiresAt,
      },
    });

    await auditService.log('client_approval_requested', {
      firmId: approval.firmId,
      clientId: approval.clientId,
      userId: data.requestedByUserId || null,
      actorType: AUDIT_ACTOR_TYPES.STAFF,
      actorId: data.requestedByUserId || null,
      resourceType: 'client_approval',
      resourceId: approval.id,
      metadata: {
        title: approval.title,
        matterId: approval.matterId,
        documentId: approval.documentId,
      },
    });

    return approval;
  }

  async listClientApprovals(clientId) {
    return clientApprovalRepository.findByClient(clientId, {
      order: [['createdAt', 'DESC']],
    });
  }

  async listPendingClientApprovals(clientId) {
    return clientApprovalRepository.findPendingByClient(clientId, {
      order: [['createdAt', 'DESC']],
    });
  }

  async listMatterApprovals(matterId) {
    return clientApprovalRepository.findByMatter(matterId, {
      order: [['createdAt', 'DESC']],
    });
  }

  async approve(approvalId, accountId, decisionNote = null) {
    const approval = await clientApprovalRepository.approve(
      approvalId,
      accountId,
      decisionNote
    );

    await auditService.log('client_approval_approved', {
      firmId: approval.firmId,
      clientId: approval.clientId,
      actorType: AUDIT_ACTOR_TYPES.CLIENT,
      actorId: accountId,
      resourceType: 'client_approval',
      resourceId: approval.id,
      metadata: {
        matterId: approval.matterId,
        documentId: approval.documentId,
      },
    });

    return approval;
  }

  async reject(approvalId, accountId, decisionNote = null) {
    const approval = await clientApprovalRepository.reject(
      approvalId,
      accountId,
      decisionNote
    );

    await auditService.log('client_approval_rejected', {
      firmId: approval.firmId,
      clientId: approval.clientId,
      actorType: AUDIT_ACTOR_TYPES.CLIENT,
      actorId: accountId,
      resourceType: 'client_approval',
      resourceId: approval.id,
      metadata: {
        matterId: approval.matterId,
        documentId: approval.documentId,
      },
    });

    return approval;
  }

  async cancel(approvalId) {
    return clientApprovalRepository.cancel(approvalId);
  }
}

module.exports = ClientApprovalService;
