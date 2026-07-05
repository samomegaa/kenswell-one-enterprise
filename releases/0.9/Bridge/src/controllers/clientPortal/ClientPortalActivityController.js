const {
  clientPortalActivityService,
} = require('../../activity/clientPortal');

const {
  auditService,
  AUDIT_ACTOR_TYPES,
} = require('../../audit');

const {
  respond,
} = require('../../http');

class ClientPortalActivityController {
  async activity(req, res) {
    try {
      const activity = await clientPortalActivityService.getClientActivity({
        clientId: req.clientPortal.clientId,
        limit: req.query.limit,
      });

      await auditService.logFromRequest(req, 'client_activity_viewed', {
        actorType: AUDIT_ACTOR_TYPES.CLIENT,
        clientId: req.clientPortal.clientId,
        resourceType: 'client_activity',
        resourceId: req.clientPortal.clientId,
      });

      return respond.success(res, {
        clientId: req.clientPortal.clientId,
        activity,
      });
    } catch (error) {
      return respond.failure(res, error);
    }
  }
}

module.exports = new ClientPortalActivityController();
