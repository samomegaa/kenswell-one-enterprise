const {
  matterTimelineService,
} = require('../../timeline/clientPortal');

const {
  auditService,
  AUDIT_EVENTS,
  AUDIT_ACTOR_TYPES,
} = require('../../audit');

const {
  respond,
} = require('../../http');

class ClientPortalTimelineController {
  async matterTimeline(req, res) {
    try {
      const timeline = await matterTimelineService.getMatterTimeline({
        clientId: req.clientPortal.clientId,
        matterId: req.params.matterId,
        limit: req.query.limit,
      });

      await auditService.logFromRequest(req, AUDIT_EVENTS.MATTER_VIEWED, {
        actorType: AUDIT_ACTOR_TYPES.CLIENT,
        clientId: req.clientPortal.clientId,
        resourceType: 'portal_matter',
        resourceId: req.params.matterId,
      });

      return respond.success(res, {
        matterId: req.params.matterId,
        timeline,
      });
    } catch (error) {
      return respond.failure(res, error);
    }
  }
}

module.exports = new ClientPortalTimelineController();
