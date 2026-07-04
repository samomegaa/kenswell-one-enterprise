const express = require('express');

const authRoutes = require('./auth.routes');
const invitationRoutes = require('./invitation.routes');
const portalRoutes = require('./portal.routes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/invitations', invitationRoutes);
router.use('/portal', portalRoutes);

module.exports = router;
