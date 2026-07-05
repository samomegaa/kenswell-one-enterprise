const {
  clientApprovalService,
} = require('../../approvals/clientPortal');

const {
  respond,
} = require('../../http');

class ClientPortalApprovalController {
  async createApproval(req, res) {
    try {
      const approval = await clientApprovalService.createApproval(req.body);

      return respond.created(res, { approval });
    } catch (error) {
      return respond.failure(res, error);
    }
  }

  async listClientApprovals(req, res) {
    try {
      const approvals = await clientApprovalService.listClientApprovals(
        req.clientPortal.clientId
      );

      return respond.success(res, { approvals });
    } catch (error) {
      return respond.failure(res, error);
    }
  }

  async listPendingClientApprovals(req, res) {
    try {
      const approvals = await clientApprovalService.listPendingClientApprovals(
        req.clientPortal.clientId
      );

      return respond.success(res, {
        count: approvals.length,
        approvals,
      });
    } catch (error) {
      return respond.failure(res, error);
    }
  }

  async listMatterApprovals(req, res) {
    try {
      const approvals = await clientApprovalService.listMatterApprovals(
        req.params.matterId
      );

      return respond.success(res, { approvals });
    } catch (error) {
      return respond.failure(res, error);
    }
  }

  async approve(req, res) {
    try {
      const approval = await clientApprovalService.approve(
        req.params.approvalId,
        req.clientPortal.accountId,
        req.body.decisionNote || null
      );

      return respond.success(res, { approval });
    } catch (error) {
      return respond.failure(res, error);
    }
  }

  async reject(req, res) {
    try {
      const approval = await clientApprovalService.reject(
        req.params.approvalId,
        req.clientPortal.accountId,
        req.body.decisionNote || null
      );

      return respond.success(res, { approval });
    } catch (error) {
      return respond.failure(res, error);
    }
  }

  async cancel(req, res) {
    try {
      const approval = await clientApprovalService.cancel(req.params.approvalId);

      return respond.success(res, { approval });
    } catch (error) {
      return respond.failure(res, error);
    }
  }
}

module.exports = new ClientPortalApprovalController();
