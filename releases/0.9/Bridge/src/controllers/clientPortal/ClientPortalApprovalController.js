const {
  clientApprovalService,
} = require('../../approvals/clientPortal');

class ClientPortalApprovalController {
  async createApproval(req, res) {
    try {
      const approval = await clientApprovalService.createApproval(req.body);

      return res.status(201).json({ approval });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async listClientApprovals(req, res) {
    try {
      const approvals = await clientApprovalService.listClientApprovals(
        req.clientPortal.clientId
      );

      return res.json({ approvals });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async listPendingClientApprovals(req, res) {
    try {
      const approvals = await clientApprovalService.listPendingClientApprovals(
        req.clientPortal.clientId
      );

      return res.json({
        count: approvals.length,
        approvals,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async listMatterApprovals(req, res) {
    try {
      const approvals = await clientApprovalService.listMatterApprovals(
        req.params.matterId
      );

      return res.json({ approvals });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async approve(req, res) {
    try {
      const approval = await clientApprovalService.approve(
        req.params.approvalId,
        req.clientPortal.accountId,
        req.body.decisionNote || null
      );

      return res.json({ approval });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async reject(req, res) {
    try {
      const approval = await clientApprovalService.reject(
        req.params.approvalId,
        req.clientPortal.accountId,
        req.body.decisionNote || null
      );

      return res.json({ approval });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async cancel(req, res) {
    try {
      const approval = await clientApprovalService.cancel(req.params.approvalId);

      return res.json({ approval });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new ClientPortalApprovalController();
