const express = require('express');

const {
  clientPortalFileController,
} = require('../../controllers/clientPortal');

const {
  requireClientPortalAuth,
} = require('../../middleware/clientPortal');

const validateRequest = require('../../validation/validateRequest');

const {
  fileAssetIdParamSchema,
  prepareFileUploadBodySchema,
  confirmFileUploadBodySchema,
} = require('../../validation/clientPortal');

const router = express.Router();

router.use(requireClientPortalAuth);

router.post(
  '/prepare-upload',
  validateRequest({ body: prepareFileUploadBodySchema }),
  clientPortalFileController.prepareUpload
);

router.patch(
  '/:fileAssetId/confirm',
  validateRequest({
    params: fileAssetIdParamSchema,
    body: confirmFileUploadBodySchema,
  }),
  clientPortalFileController.confirmUpload
);

router.get(
  '/:fileAssetId/download-url',
  validateRequest({ params: fileAssetIdParamSchema }),
  clientPortalFileController.downloadUrl
);

module.exports = router;
