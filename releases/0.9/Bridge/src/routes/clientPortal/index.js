const express = require('express');

const authRoutes = require('./auth.routes');
const invitationRoutes = require('./invitation.routes');
const portalRoutes = require('./portal.routes');
const documentRoutes = require('./document.routes');
const messageRoutes = require('./message.routes');
const timelineRoutes = require('./timeline.routes');
const fileRoutes = require('./file.routes');
const taskRoutes = require('./task.routes');
const approvalRoutes = require('./approval.routes');
const activityRoutes = require('./activity.routes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/invitations', invitationRoutes);
router.use('/portal', portalRoutes);
router.use('/documents', documentRoutes);
router.use('/messages', messageRoutes);
router.use('/timeline', timelineRoutes);
router.use('/files', fileRoutes);
router.use('/tasks', taskRoutes);
router.use('/approvals', approvalRoutes);
router.use('/activity', activityRoutes);

module.exports = router;
