const express = require('express');

const {
  clientPortalController,
} = require('../../controllers/clientPortal');

const {
  requireClientPortalAuth,
} = require('../../middleware/clientPortal');

const router = express.Router();

router.use(requireClientPortalAuth);

router.get('/overview', clientPortalController.overview);
router.get('/matters', clientPortalController.matters);
router.get('/documents', clientPortalController.documents);
router.get('/messages', clientPortalController.messages);
router.get('/matters/:matterId/messages', clientPortalController.matterMessages);
router.post('/messages', clientPortalController.sendMessage);
router.patch('/messages/:messageId/read', clientPortalController.markMessageRead);

module.exports = router;
