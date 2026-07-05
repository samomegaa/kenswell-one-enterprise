const express = require('express');

const {
  clientPortalTimelineController,
} = require('../../controllers/clientPortal');

const {
  requireClientPortalAuth,
} = require('../../middleware/clientPortal');

const validateRequest = require('../../validation/validateRequest');

const {
  matterIdParamSchema,
  timelineQuerySchema,
} = require('../../validation/clientPortal');

const router = express.Router();

router.use(requireClientPortalAuth);

router.get(
  '/matters/:matterId',
  validateRequest({
    params: matterIdParamSchema,
    query: timelineQuerySchema,
  }),
  clientPortalTimelineController.matterTimeline
);

module.exports = router;
