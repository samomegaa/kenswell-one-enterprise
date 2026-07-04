const express = require('express');

const {
  clientPortalInvitationController,
} = require('../../controllers/clientPortal');

const router = express.Router();

router.post('/existing-client', clientPortalInvitationController.inviteExistingClient);
router.post('/new-client', clientPortalInvitationController.inviteNewClient);
router.post('/:accountId/resend', clientPortalInvitationController.resendInvitation);

module.exports = router;
