const { z } = require('zod');

const uuid = z.string().uuid();

const tokenParamSchema = z.object({
  token: z.string().min(16),
});

const accountIdParamSchema = z.object({
  accountId: uuid,
});

const matterIdParamSchema = z.object({
  matterId: uuid,
});

const messageIdParamSchema = z.object({
  messageId: uuid,
});

const activateInvitationBodySchema = z.object({
  token: z.string().min(16),
  password: z.string().min(8),
});

const loginBodySchema = z.object({
  email: z.string().email().transform((value) => value.toLowerCase()),
  password: z.string().min(1),
});

const inviteExistingClientBodySchema = z.object({
  firmId: uuid,
  clientId: uuid,
  email: z.string().email().transform((value) => value.toLowerCase()),
  role: z.enum(['client_owner', 'client_user', 'view_only']).optional(),
  expiresInHours: z.number().int().positive().max(720).optional(),
  portalBaseUrl: z.string().url().optional(),
});

const inviteNewClientBodySchema = z.object({
  firmId: uuid,
  clientData: z.object({
    type: z.enum(['individual', 'company', 'organisation']).optional(),
    displayName: z.string().min(2),
    email: z.string().email().transform((value) => value.toLowerCase()),
    phone: z.string().optional().nullable(),
    reference: z.string().optional().nullable(),
    metadata: z.record(z.any()).optional(),
  }),
  role: z.enum(['client_owner', 'client_user', 'view_only']).optional(),
  expiresInHours: z.number().int().positive().max(720).optional(),
  portalBaseUrl: z.string().url().optional(),
});

const resendInvitationBodySchema = z.object({
  expiresInHours: z.number().int().positive().max(720).optional(),
  portalBaseUrl: z.string().url().optional(),
});

const sendMessageBodySchema = z.object({
  matterId: uuid,
  subject: z.string().max(255).optional().nullable(),
  body: z.string().min(1),
});

const documentIdParamSchema = z.object({
  documentId: uuid,
});

const requestDocumentBodySchema = z.object({
  firmId: uuid,
  clientId: uuid,
  matterId: uuid,
  title: z.string().min(2),
  description: z.string().optional().nullable(),
  visibility: z.enum(['internal_only', 'client_visible', 'client_uploaded']).optional(),
  requestedByUserId: uuid.optional().nullable(),
});

const uploadDocumentMetadataBodySchema = z.object({
  fileKey: z.string().min(1),
  fileName: z.string().min(1),
  mimeType: z.string().min(1),
  sizeBytes: z.number().int().positive().optional().nullable(),
});

const reviewDocumentBodySchema = z.object({
  reviewedByUserId: uuid,
});

const rejectDocumentBodySchema = z.object({
  reviewedByUserId: uuid,
  reason: z.string().optional().nullable(),
});

const staffSendMessageBodySchema = z.object({
  firmId: uuid,
  clientId: uuid,
  matterId: uuid,
  senderId: uuid,
  subject: z.string().max(255).optional().nullable(),
  body: z.string().min(1),
});

const archiveMessageBodySchema = z.object({
  reason: z.string().optional().nullable(),
});

const timelineQuerySchema = z.object({
  limit: z.coerce.number().int().positive().max(100).optional(),
});

const activityQuerySchema = z.object({
  limit: z.coerce.number().int().positive().max(100).optional(),
});

const fileAssetIdParamSchema = z.object({
  fileAssetId: uuid,
});

const prepareFileUploadBodySchema = z.object({
  firmId: uuid,
  clientId: uuid.optional().nullable(),
  matterId: uuid.optional().nullable(),
  documentId: uuid.optional().nullable(),
  originalName: z.string().min(1),
  mimeType: z.string().min(1),
  sizeBytes: z.number().int().positive(),
  visibility: z.enum(['private', 'client_visible', 'internal_only']).optional(),
  uploadedByType: z.enum(['staff', 'client', 'system']).optional().nullable(),
  uploadedById: uuid.optional().nullable(),
});

const confirmFileUploadBodySchema = z.object({
  checksum: z.string().optional().nullable(),
});

const taskIdParamSchema = z.object({
  taskId: uuid,
});

const createClientTaskBodySchema = z.object({
  firmId: uuid,
  clientId: uuid,
  matterId: uuid.optional().nullable(),
  title: z.string().min(2),
  description: z.string().optional().nullable(),
  type: z.enum(['general', 'document_upload', 'form_completion', 'review_and_confirm', 'payment']).optional(),
  priority: z.enum(['low', 'normal', 'high', 'urgent']).optional(),
  dueAt: z.string().datetime().optional().nullable(),
  assignedByUserId: uuid.optional().nullable(),
  metadata: z.record(z.any()).optional(),
});

const approvalIdParamSchema = z.object({
  approvalId: uuid,
});

const createClientApprovalBodySchema = z.object({
  firmId: uuid,
  clientId: uuid,
  matterId: uuid.optional().nullable(),
  documentId: uuid.optional().nullable(),
  title: z.string().min(2),
  description: z.string().optional().nullable(),
  type: z.enum(['general', 'document_approval', 'terms_acceptance', 'instruction_confirmation', 'fee_approval']).optional(),
  requestedByUserId: uuid.optional().nullable(),
  expiresAt: z.string().datetime().optional().nullable(),
  metadata: z.record(z.any()).optional(),
});

const decideClientApprovalBodySchema = z.object({
  decisionNote: z.string().optional().nullable(),
});

module.exports = {
  tokenParamSchema,
  accountIdParamSchema,
  matterIdParamSchema,
  messageIdParamSchema,
  activateInvitationBodySchema,
  loginBodySchema,
  inviteExistingClientBodySchema,
  inviteNewClientBodySchema,
  resendInvitationBodySchema,
  sendMessageBodySchema,
  documentIdParamSchema,
  requestDocumentBodySchema,
  uploadDocumentMetadataBodySchema,
  reviewDocumentBodySchema,
  rejectDocumentBodySchema,
  staffSendMessageBodySchema,
  archiveMessageBodySchema,
  timelineQuerySchema,
  activityQuerySchema,
  fileAssetIdParamSchema,
  prepareFileUploadBodySchema,
  confirmFileUploadBodySchema,
  taskIdParamSchema,
  createClientTaskBodySchema,
  approvalIdParamSchema,
  createClientApprovalBodySchema,
  decideClientApprovalBodySchema,
};
