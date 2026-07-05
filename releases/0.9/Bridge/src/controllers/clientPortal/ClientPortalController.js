const {
  clientPortalService,
  portalMatterService,
  portalDocumentService,
  portalMessageService,
} = require('../../services/clientPortal');

const {
  respond,
} = require('../../http');

class ClientPortalController {
  async overview(req, res) {
    try {
      const overview = await clientPortalService.getClientPortalOverview(
        req.clientPortal.clientId
      );

      return respond.success(res, { overview });
    } catch (error) {
      return respond.failure(res, error);
    }
  }

  async matters(req, res) {
    try {
      const matters = await portalMatterService.listClientMatters(
        req.clientPortal.clientId
      );

      return respond.success(res, { matters });
    } catch (error) {
      return respond.failure(res, error);
    }
  }

  async documents(req, res) {
    try {
      const documents = await portalDocumentService.listClientDocuments(
        req.clientPortal.clientId
      );

      return respond.success(res, { documents });
    } catch (error) {
      return respond.failure(res, error);
    }
  }

  async messages(req, res) {
    try {
      const messages = await portalMessageService.listClientMessages(
        req.clientPortal.clientId
      );

      return respond.success(res, { messages });
    } catch (error) {
      return respond.failure(res, error);
    }
  }

  async matterMessages(req, res) {
    try {
      const messages = await portalMessageService.listMatterMessages(
        req.params.matterId
      );

      return respond.success(res, { messages });
    } catch (error) {
      return respond.failure(res, error);
    }
  }

  async sendMessage(req, res) {
    try {
      const message = await portalMessageService.sendMessage({
        firmId: req.clientPortal.firmId,
        clientId: req.clientPortal.clientId,
        matterId: req.body.matterId,
        senderType: 'client',
        senderId: req.clientPortal.accountId,
        subject: req.body.subject,
        body: req.body.body,
      });

      return respond.created(res, { message });
    } catch (error) {
      return respond.failure(res, error);
    }
  }

  async markMessageRead(req, res) {
    try {
      const message = await portalMessageService.markMessageRead(req.params.messageId);

      return respond.success(res, { message });
    } catch (error) {
      return respond.failure(res, error);
    }
  }
}

module.exports = new ClientPortalController();
