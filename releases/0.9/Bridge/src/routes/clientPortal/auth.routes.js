const express = require('express');

const {
  clientPortalAuthController,
} = require('../../controllers/clientPortal');

const validateRequest = require('../../validation/validateRequest');

const {
  tokenParamSchema,
  activateInvitationBodySchema,
  loginBodySchema,
} = require('../../validation/clientPortal');

const router = express.Router();

router.get(
  '/invitations/:token/validate',
  validateRequest({ params: tokenParamSchema }),
  clientPortalAuthController.validateInvitation
);

router.post(
  '/activate',
  validateRequest({ body: activateInvitationBodySchema }),
  clientPortalAuthController.activateInvitation
);

router.post(
  '/login',
  validateRequest({ body: loginBodySchema }),
  clientPortalAuthController.login
);

module.exports = router;
