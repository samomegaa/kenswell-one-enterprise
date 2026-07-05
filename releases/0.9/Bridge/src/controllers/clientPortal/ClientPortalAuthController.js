const {
  clientPortalAuthService,
} = require('../../auth/clientPortal');

const {
  clientPortalInvitationWorkflow,
} = require('../../workflows/clientPortal');

const {
  respond,
} = require('../../http');

class ClientPortalAuthController {
  async validateInvitation(req, res) {
    try {
      const result = await clientPortalInvitationWorkflow.validateInvitation(req.params.token);

      return respond.success(res, {
        invitation: result,
      });
    } catch (error) {
      return respond.failure(res, error);
    }
  }

  async activateInvitation(req, res) {
    try {
      const account = await clientPortalInvitationWorkflow.activateInvitation({
        token: req.body.token,
        password: req.body.password,
      });

      return respond.success(res, {
        message: 'Client portal account activated',
        account,
      });
    } catch (error) {
      return respond.failure(res, error);
    }
  }

  async login(req, res) {
    try {
      const session = await clientPortalAuthService.login({
        email: req.body.email,
        password: req.body.password,
      });

      return respond.success(res, {
        session,
      });
    } catch (error) {
      return respond.failure(res, error, 401, 'unauthorized');
    }
  }
}

module.exports = new ClientPortalAuthController();
