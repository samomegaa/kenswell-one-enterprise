const {
  portalMessageRepository,
} = require('../../repositories/clientPortal');

class PortalMessageService {
  async sendMessage(data) {
    return portalMessageRepository.create({
      ...data,
      status: 'sent',
    });
  }

  async listClientMessages(clientId) {
    return portalMessageRepository.findByClientId(clientId);
  }

  async listMatterMessages(matterId) {
    return portalMessageRepository.findByMatterId(matterId);
  }

  async listUnreadClientMessages(clientId) {
    return portalMessageRepository.findUnreadByClientId(clientId);
  }

  async markMessageRead(messageId) {
    return portalMessageRepository.markRead(messageId);
  }

  async archiveMessage(messageId) {
    return portalMessageRepository.archive(messageId);
  }
}

module.exports = PortalMessageService;
