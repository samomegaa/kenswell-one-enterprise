const {
  clientPortalAuthService,
} = require('../../auth/clientPortal');

const {
  clientPortalInvitationWorkflow,
} = require('../../workflows/clientPortal');

class ClientPortalAuthController {
  async validateInvitation(req, res) {
    try {
      const { token } = req.params;

      const result = await clientPortalInvitationWorkflow.validateInvitation(token);

      return res.json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async activateInvitation(req, res) {
    try {
      const { token, password } = req.body;

      const account = await clientPortalInvitationWorkflow.activateInvitation({
        token,
        password,
      });

      return res.status(200).json({
        message: 'Client portal account activated',
        account,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const session = await clientPortalAuthService.login({
        email,
        password,
      });

      return res.json(session);
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }
}

module.exports = new ClientPortalAuthController();
