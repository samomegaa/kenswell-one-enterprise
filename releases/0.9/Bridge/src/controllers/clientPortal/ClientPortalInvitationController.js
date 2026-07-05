const {
  clientPortalInvitationWorkflow,
} = require('../../workflows/clientPortal');

const {
  respond,
} = require('../../http');

class ClientPortalInvitationController {
  async inviteExistingClient(req, res) {
    try {
      const invitation = await clientPortalInvitationWorkflow.inviteExistingClient(req.body);

      return respond.created(res, { invitation });
    } catch (error) {
      return respond.failure(res, error);
    }
  }

  async inviteNewClient(req, res) {
    try {
      const invitation = await clientPortalInvitationWorkflow.inviteNewClient(req.body);

      return respond.created(res, { invitation });
    } catch (error) {
      return respond.failure(res, error);
    }
  }

  async resendInvitation(req, res) {
    try {
      const invitation = await clientPortalInvitationWorkflow.resendInvitation({
        accountId: req.params.accountId,
        ...req.body,
      });

      return respond.success(res, { invitation });
    } catch (error) {
      return respond.failure(res, error);
    }
  }
}

module.exports = new ClientPortalInvitationController();
