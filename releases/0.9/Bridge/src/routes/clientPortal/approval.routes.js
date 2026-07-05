const express = require('express');

const {
  clientPortalApprovalController,
} = require('../../controllers/clientPortal');

const {
  requireClientPortalAuth,
} = require('../../middleware/clientPortal');

const validateRequest = require('../../validation/validateRequest');

const {
  matterIdParamSchema,
  approvalIdParamSchema,
  createClientApprovalBodySchema,
  decideClientApprovalBodySchema,
} = require('../../validation/clientPortal');

const router = express.Router();

router.post(
  '/',
  validateRequest({ body: createClientApprovalBodySchema }),
  clientPortalApprovalController.createApproval
);

router.use(requireClientPortalAuth);

router.get('/', clientPortalApprovalController.listClientApprovals);
router.get('/pending', clientPortalApprovalController.listPendingClientApprovals);

router.get(
  '/matters/:matterId',
  validateRequest({ params: matterIdParamSchema }),
  clientPortalApprovalController.listMatterApprovals
);

router.patch(
  '/:approvalId/approve',
  validateRequest({
    params: approvalIdParamSchema,
    body: decideClientApprovalBodySchema,
  }),
  clientPortalApprovalController.approve
);

router.patch(
  '/:approvalId/reject',
  validateRequest({
    params: approvalIdParamSchema,
    body: decideClientApprovalBodySchema,
  }),
  clientPortalApprovalController.reject
);

router.patch(
  '/:approvalId/cancel',
  validateRequest({ params: approvalIdParamSchema }),
  clientPortalApprovalController.cancel
);

module.exports = router;
