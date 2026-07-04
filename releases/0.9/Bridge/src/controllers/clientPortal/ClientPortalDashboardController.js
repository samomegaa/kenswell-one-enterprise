const {
  clientPortalDashboardService,
} = require('../../dashboard/clientPortal');

const {
  auditService,
  AUDIT_EVENTS,
  AUDIT_ACTOR_TYPES,
} = require('../../audit');

class ClientPortalDashboardController {
  async dashboard(req, res) {
    try {
      const dashboard = await clientPortalDashboardService.getDashboard(
        req.clientPortal.clientId
      );

      await auditService.logFromRequest(req, AUDIT_EVENTS.CLIENT_PORTAL_VIEWED, {
        actorType: AUDIT_ACTOR_TYPES.CLIENT,
        resourceType: 'client_portal_dashboard',
        resourceId: req.clientPortal.clientId,
      });

      return res.json(dashboard);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new ClientPortalDashboardController();
