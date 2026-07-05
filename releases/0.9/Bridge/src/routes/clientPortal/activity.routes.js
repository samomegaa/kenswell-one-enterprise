const express = require('express');

const {
  clientPortalActivityController,
} = require('../../controllers/clientPortal');

const {
  requireClientPortalAuth,
} = require('../../middleware/clientPortal');

const validateRequest = require('../../validation/validateRequest');

const {
  activityQuerySchema,
} = require('../../validation/clientPortal');

const router = express.Router();

router.use(requireClientPortalAuth);

router.get(
  '/',
  validateRequest({ query: activityQuerySchema }),
  clientPortalActivityController.activity
);

module.exports = router;
