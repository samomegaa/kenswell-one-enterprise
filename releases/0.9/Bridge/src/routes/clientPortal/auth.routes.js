const express = require('express');

const {
  clientPortalAuthController,
} = require('../../controllers/clientPortal');

const router = express.Router();

router.get('/invitations/:token/validate', clientPortalAuthController.validateInvitation);
router.post('/activate', clientPortalAuthController.activateInvitation);
router.post('/login', clientPortalAuthController.login);

module.exports = router;
