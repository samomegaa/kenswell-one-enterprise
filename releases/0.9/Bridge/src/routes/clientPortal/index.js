const express = require('express');

const authRoutes = require('./auth.routes');
const invitationRoutes = require('./invitation.routes');
const portalRoutes = require('./portal.routes');
const documentRoutes = require('./document.routes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/invitations', invitationRoutes);
router.use('/portal', portalRoutes);
router.use('/documents', documentRoutes);

module.exports = router;
