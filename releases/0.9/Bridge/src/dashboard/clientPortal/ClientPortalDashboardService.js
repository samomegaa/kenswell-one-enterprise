const {
  clientPortalService,
  portalMatterService,
  portalDocumentService,
  portalMessageService,
} = require('../../services/clientPortal');

const {
  notificationRepository,
} = require('../../repositories/notifications');

class ClientPortalDashboardService {
  async getDashboard(clientId) {
    const [overview, matters, documents, messages, notifications] = await Promise.all([
      clientPortalService.getClientPortalOverview(clientId),
      portalMatterService.listClientMatters(clientId),
      portalDocumentService.listClientDocuments(clientId),
      portalMessageService.listClientMessages(clientId),
      notificationRepository.findByClient(clientId, {
        limit: 10,
        order: [['createdAt', 'DESC']],
      }),
    ]);

    const openMatters = matters.filter((matter) => matter.status === 'open');
    const requestedDocuments = documents.filter((document) => document.status === 'requested');
    const unreadMessages = messages.filter((message) => message.status === 'sent');

    return {
      client: overview.client,
      account: overview.account,
      summary: {
        totalMatters: matters.length,
        openMatters: openMatters.length,
        requestedDocuments: requestedDocuments.length,
        unreadMessages: unreadMessages.length,
        recentNotifications: notifications.length,
      },
      openMatters,
      requestedDocuments,
      unreadMessages,
      recentNotifications: notifications,
    };
  }
}

module.exports = ClientPortalDashboardService;
