const {
  clientPortalInvitationWorkflow,
} = require('../../workflows/clientPortal');

class ClientPortalInvitationController {
  async inviteExistingClient(req, res) {
    try {
      const payload = await clientPortalInvitationWorkflow.inviteExistingClient(req.body);

      return res.status(201).json(payload);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async inviteNewClient(req, res) {
    try {
      const payload = await clientPortalInvitationWorkflow.inviteNewClient(req.body);

      return res.status(201).json(payload);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async resendInvitation(req, res) {
    try {
      const payload = await clientPortalInvitationWorkflow.resendInvitation({
        accountId: req.params.accountId,
        ...req.body,
      });

      return res.json(payload);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new ClientPortalInvitationController();
