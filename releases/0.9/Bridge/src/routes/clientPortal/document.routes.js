const express = require('express');

const {
  clientPortalDocumentController,
} = require('../../controllers/clientPortal');

const {
  requireClientPortalAuth,
} = require('../../middleware/clientPortal');

const validateRequest = require('../../validation/validateRequest');

const {
  matterIdParamSchema,
  documentIdParamSchema,
  requestDocumentBodySchema,
  uploadDocumentMetadataBodySchema,
  reviewDocumentBodySchema,
  rejectDocumentBodySchema,
} = require('../../validation/clientPortal');

const router = express.Router();

router.post(
  '/request',
  validateRequest({ body: requestDocumentBodySchema }),
  clientPortalDocumentController.requestDocument
);

router.use(requireClientPortalAuth);

router.get('/', clientPortalDocumentController.listClientDocuments);

router.get(
  '/matters/:matterId',
  validateRequest({ params: matterIdParamSchema }),
  clientPortalDocumentController.listMatterDocuments
);

router.patch(
  '/:documentId/upload-metadata',
  validateRequest({
    params: documentIdParamSchema,
    body: uploadDocumentMetadataBodySchema,
  }),
  clientPortalDocumentController.uploadDocumentMetadata
);

router.patch(
  '/:documentId/review',
  validateRequest({
    params: documentIdParamSchema,
    body: reviewDocumentBodySchema,
  }),
  clientPortalDocumentController.reviewDocument
);

router.patch(
  '/:documentId/approve',
  validateRequest({
    params: documentIdParamSchema,
    body: reviewDocumentBodySchema,
  }),
  clientPortalDocumentController.approveDocument
);

router.patch(
  '/:documentId/reject',
  validateRequest({
    params: documentIdParamSchema,
    body: rejectDocumentBodySchema,
  }),
  clientPortalDocumentController.rejectDocument
);

module.exports = router;
