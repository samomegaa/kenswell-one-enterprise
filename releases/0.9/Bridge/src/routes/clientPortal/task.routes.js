const express = require('express');

const {
  clientPortalTaskController,
} = require('../../controllers/clientPortal');

const {
  requireClientPortalAuth,
} = require('../../middleware/clientPortal');

const validateRequest = require('../../validation/validateRequest');

const {
  matterIdParamSchema,
  taskIdParamSchema,
  createClientTaskBodySchema,
} = require('../../validation/clientPortal');

const router = express.Router();

router.post(
  '/',
  validateRequest({ body: createClientTaskBodySchema }),
  clientPortalTaskController.createTask
);

router.use(requireClientPortalAuth);

router.get('/', clientPortalTaskController.listClientTasks);
router.get('/open', clientPortalTaskController.listOpenClientTasks);

router.get(
  '/matters/:matterId',
  validateRequest({ params: matterIdParamSchema }),
  clientPortalTaskController.listMatterTasks
);

router.patch(
  '/:taskId/complete',
  validateRequest({ params: taskIdParamSchema }),
  clientPortalTaskController.completeTask
);

router.patch(
  '/:taskId/cancel',
  validateRequest({ params: taskIdParamSchema }),
  clientPortalTaskController.cancelTask
);

module.exports = router;
