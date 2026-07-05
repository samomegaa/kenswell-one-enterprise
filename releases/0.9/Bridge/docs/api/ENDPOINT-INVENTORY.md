# Client Portal Endpoint Inventory

| Method | Path | Route File |
|---|---|---|
| GET | `/api/client-portal/activity` | activity.routes.js |
| POST | `/api/client-portal/approvals` | approval.routes.js |
| GET | `/api/client-portal/approvals` | approval.routes.js |
| GET | `/api/client-portal/approvals/pending` | approval.routes.js |
| GET | `/api/client-portal/approvals/matters/:matterId` | approval.routes.js |
| PATCH | `/api/client-portal/approvals/:approvalId/approve` | approval.routes.js |
| PATCH | `/api/client-portal/approvals/:approvalId/reject` | approval.routes.js |
| PATCH | `/api/client-portal/approvals/:approvalId/cancel` | approval.routes.js |
| GET | `/api/client-portal/auth/invitations/:token/validate` | auth.routes.js |
| POST | `/api/client-portal/auth/activate` | auth.routes.js |
| POST | `/api/client-portal/auth/login` | auth.routes.js |
| POST | `/api/client-portal/documents/request` | document.routes.js |
| GET | `/api/client-portal/documents` | document.routes.js |
| GET | `/api/client-portal/documents/matters/:matterId` | document.routes.js |
| PATCH | `/api/client-portal/documents/:documentId/upload-metadata` | document.routes.js |
| PATCH | `/api/client-portal/documents/:documentId/review` | document.routes.js |
| PATCH | `/api/client-portal/documents/:documentId/approve` | document.routes.js |
| PATCH | `/api/client-portal/documents/:documentId/reject` | document.routes.js |
| POST | `/api/client-portal/files/prepare-upload` | file.routes.js |
| PATCH | `/api/client-portal/files/:fileAssetId/confirm` | file.routes.js |
| GET | `/api/client-portal/files/:fileAssetId/download-url` | file.routes.js |
| POST | `/api/client-portal/invitations/existing-client` | invitation.routes.js |
| POST | `/api/client-portal/invitations/new-client` | invitation.routes.js |
| POST | `/api/client-portal/invitations/:accountId/resend` | invitation.routes.js |
| POST | `/api/client-portal/messages/staff` | message.routes.js |
| GET | `/api/client-portal/messages` | message.routes.js |
| GET | `/api/client-portal/messages/unread` | message.routes.js |
| GET | `/api/client-portal/messages/matters/:matterId` | message.routes.js |
| POST | `/api/client-portal/messages` | message.routes.js |
| PATCH | `/api/client-portal/messages/:messageId/read` | message.routes.js |
| PATCH | `/api/client-portal/messages/:messageId/archive` | message.routes.js |
| GET | `/api/client-portal/portal/dashboard` | portal.routes.js |
| GET | `/api/client-portal/portal/overview` | portal.routes.js |
| GET | `/api/client-portal/portal/matters` | portal.routes.js |
| GET | `/api/client-portal/portal/documents` | portal.routes.js |
| GET | `/api/client-portal/portal/messages` | portal.routes.js |
| GET | `/api/client-portal/portal/matters/:matterId/messages` | portal.routes.js |
| POST | `/api/client-portal/portal/messages` | portal.routes.js |
| PATCH | `/api/client-portal/portal/messages/:messageId/read` | portal.routes.js |
| POST | `/api/client-portal/tasks` | task.routes.js |
| GET | `/api/client-portal/tasks` | task.routes.js |
| GET | `/api/client-portal/tasks/open` | task.routes.js |
| GET | `/api/client-portal/tasks/matters/:matterId` | task.routes.js |
| PATCH | `/api/client-portal/tasks/:taskId/complete` | task.routes.js |
| PATCH | `/api/client-portal/tasks/:taskId/cancel` | task.routes.js |
| GET | `/api/client-portal/timeline/matters/:matterId` | timeline.routes.js |

Total endpoints: 46
