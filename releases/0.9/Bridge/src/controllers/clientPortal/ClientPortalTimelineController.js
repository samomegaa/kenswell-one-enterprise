const {
  matterTimelineService,
} = require('../../timeline/clientPortal');

const {
  auditService,
  AUDIT_EVENTS,
  AUDIT_ACTOR_TYPES,
} = require('../../audit');

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

      return res.json({
        matterId: req.params.matterId,
        timeline,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new ClientPortalTimelineController();
