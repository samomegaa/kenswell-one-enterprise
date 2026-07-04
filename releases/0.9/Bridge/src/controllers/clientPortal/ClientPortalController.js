const {
  clientPortalService,
  portalMatterService,
  portalDocumentService,
  portalMessageService,
} = require('../../services/clientPortal');

class ClientPortalController {
  async overview(req, res) {
    try {
      const overview = await clientPortalService.getClientPortalOverview(
        req.clientPortal.clientId
      );

      return res.json(overview);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async matters(req, res) {
    try {
      const matters = await portalMatterService.listClientMatters(
        req.clientPortal.clientId
      );

      return res.json({ matters });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async documents(req, res) {
    try {
      const documents = await portalDocumentService.listClientDocuments(
        req.clientPortal.clientId
      );

      return res.json({ documents });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async messages(req, res) {
    try {
      const messages = await portalMessageService.listClientMessages(
        req.clientPortal.clientId
      );

      return res.json({ messages });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async matterMessages(req, res) {
    try {
      const messages = await portalMessageService.listMatterMessages(
        req.params.matterId
      );

      return res.json({ messages });
    } catch (error) {
      return res.status(400).json({ error: error.message });
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

      return res.status(201).json({ message });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async markMessageRead(req, res) {
    try {
      const message = await portalMessageService.markMessageRead(req.params.messageId);

      return res.json({ message });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new ClientPortalController();
