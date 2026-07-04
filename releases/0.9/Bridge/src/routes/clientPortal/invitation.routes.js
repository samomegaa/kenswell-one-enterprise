const express = require('express');

const {
  clientPortalInvitationController,
} = require('../../controllers/clientPortal');

const validateRequest = require('../../validation/validateRequest');

const {
  accountIdParamSchema,
  inviteExistingClientBodySchema,
  inviteNewClientBodySchema,
  resendInvitationBodySchema,
} = require('../../validation/clientPortal');

const router = express.Router();

router.post(
  '/existing-client',
  validateRequest({ body: inviteExistingClientBodySchema }),
  clientPortalInvitationController.inviteExistingClient
);

router.post(
  '/new-client',
  validateRequest({ body: inviteNewClientBodySchema }),
  clientPortalInvitationController.inviteNewClient
);

router.post(
  '/:accountId/resend',
  validateRequest({
    params: accountIdParamSchema,
    body: resendInvitationBodySchema,
  }),
  clientPortalInvitationController.resendInvitation
);

module.exports = router;
