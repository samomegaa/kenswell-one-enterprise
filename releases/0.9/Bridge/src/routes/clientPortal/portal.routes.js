const express = require('express');

const {
  clientPortalController,
} = require('../../controllers/clientPortal');

const {
  requireClientPortalAuth,
} = require('../../middleware/clientPortal');

const validateRequest = require('../../validation/validateRequest');

const {
  matterIdParamSchema,
  messageIdParamSchema,
  sendMessageBodySchema,
} = require('../../validation/clientPortal');

const router = express.Router();

router.use(requireClientPortalAuth);

router.get('/overview', clientPortalController.overview);
router.get('/matters', clientPortalController.matters);
router.get('/documents', clientPortalController.documents);
router.get('/messages', clientPortalController.messages);

router.get(
  '/matters/:matterId/messages',
  validateRequest({ params: matterIdParamSchema }),
  clientPortalController.matterMessages
);

router.post(
  '/messages',
  validateRequest({ body: sendMessageBodySchema }),
  clientPortalController.sendMessage
);

router.patch(
  '/messages/:messageId/read',
  validateRequest({ params: messageIdParamSchema }),
  clientPortalController.markMessageRead
);

module.exports = router;
