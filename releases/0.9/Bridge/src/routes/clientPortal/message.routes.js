const express = require('express');

const {
  clientPortalMessageController,
} = require('../../controllers/clientPortal');

const {
  requireClientPortalAuth,
} = require('../../middleware/clientPortal');

const validateRequest = require('../../validation/validateRequest');

const {
  matterIdParamSchema,
  messageIdParamSchema,
  sendMessageBodySchema,
  staffSendMessageBodySchema,
  archiveMessageBodySchema,
} = require('../../validation/clientPortal');

const router = express.Router();

router.post(
  '/staff',
  validateRequest({ body: staffSendMessageBodySchema }),
  clientPortalMessageController.sendStaffMessage
);

router.use(requireClientPortalAuth);

router.get('/', clientPortalMessageController.listClientMessages);
router.get('/unread', clientPortalMessageController.listUnreadClientMessages);

router.get(
  '/matters/:matterId',
  validateRequest({ params: matterIdParamSchema }),
  clientPortalMessageController.listMatterMessages
);

router.post(
  '/',
  validateRequest({ body: sendMessageBodySchema }),
  clientPortalMessageController.sendClientMessage
);

router.patch(
  '/:messageId/read',
  validateRequest({ params: messageIdParamSchema }),
  clientPortalMessageController.markMessageRead
);

router.patch(
  '/:messageId/archive',
  validateRequest({
    params: messageIdParamSchema,
    body: archiveMessageBodySchema,
  }),
  clientPortalMessageController.archiveMessage
);

module.exports = router;
