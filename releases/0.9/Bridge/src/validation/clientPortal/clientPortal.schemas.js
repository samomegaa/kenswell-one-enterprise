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
};
