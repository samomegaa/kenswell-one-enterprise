# Bridge Architecture Tree Snapshot

```text
Bridge
├── ARCHITECTURE.md
├── README.md
├── RELEASE_NOTES.md
├── apps
│   └── client-portal
│       ├── .env.example
│       ├── .gitignore
│       ├── deploy
│       │   ├── htaccess.client-portal
│       │   └── nginx.client-portal.conf
│       ├── docs
│       │   └── DEPLOYMENT.md
│       ├── index.html
│       ├── package-lock.json
│       ├── package.json
│       ├── src
│       │   ├── App.jsx
│       │   ├── api
│       │   │   ├── authStore.js
│       │   │   └── clientPortalApi.js
│       │   ├── components
│       │   │   ├── ActionNotice.jsx
│       │   │   ├── DataList.jsx
│       │   │   ├── EmptyState.jsx
│       │   │   ├── ErrorState.jsx
│       │   │   ├── LoadingState.jsx
│       │   │   ├── PageHeader.jsx
│       │   │   └── StatusBadge.jsx
│       │   ├── layouts
│       │   │   └── ClientPortalLayout.jsx
│       │   ├── main.jsx
│       │   ├── pages
│       │   │   ├── ActivatePage.jsx
│       │   │   ├── ActivityPage.jsx
│       │   │   ├── ApprovalsPage.jsx
│       │   │   ├── DashboardPage.jsx
│       │   │   ├── DocumentsPage.jsx
│       │   │   ├── LoginPage.jsx
│       │   │   ├── MessagesPage.jsx
│       │   │   └── TasksPage.jsx
│       │   └── styles
│       │       └── client-portal.css
│       └── vite.config.js
├── docs
├── domains
│   └── client-portal
│       ├── package.json
│       └── src
│           ├── contracts
│           ├── domain
│           │   ├── client-activity.js
│           │   ├── client-approval.js
│           │   ├── client-portal-types.js
│           │   ├── client-task.js
│           │   ├── helpers.js
│           │   ├── portal-access.js
│           │   └── portal-profile.js
│           └── tests
├── review
│   └── rc1
│       ├── RC1-CHECKLIST.md
│       ├── RC1-STABILISATION-PLAN.md
│       ├── architecture
│       │   ├── ARCHITECTURE-REVIEW.md
│       │   ├── analyse-architecture.js
│       │   ├── architecture-report.json
│       │   └── snapshot-tree.js
│       └── verify-rc1-baseline.js
└── src
    ├── activity
    │   └── clientPortal
    │       ├── ClientPortalActivityService.js
    │       └── index.js
    ├── approvals
    │   └── clientPortal
    │       ├── ClientApprovalService.js
    │       ├── approval.constants.js
    │       └── index.js
    ├── audit
    │   ├── AuditService.js
    │   ├── audit.constants.js
    │   ├── audit.middleware.js
    │   └── index.js
    ├── auth
    │   └── clientPortal
    │       ├── ClientPortalAuthService.js
    │       ├── auth.constants.js
    │       ├── index.js
    │       ├── password.util.js
    │       └── token.util.js
    ├── controllers
    │   └── clientPortal
    │       ├── ClientPortalActivityController.js
    │       ├── ClientPortalApprovalController.js
    │       ├── ClientPortalAuthController.js
    │       ├── ClientPortalController.js
    │       ├── ClientPortalDashboardController.js
    │       ├── ClientPortalDocumentController.js
    │       ├── ClientPortalFileController.js
    │       ├── ClientPortalInvitationController.js
    │       ├── ClientPortalMessageController.js
    │       ├── ClientPortalTaskController.js
    │       ├── ClientPortalTimelineController.js
    │       └── index.js
    ├── dashboard
    │   └── clientPortal
    │       ├── ClientPortalDashboardService.js
    │       └── index.js
    ├── database
    │   ├── migrations
    │   │   ├── 20260704_001_create_clients.js
    │   │   ├── 20260704_002_create_portal_accounts.js
    │   │   ├── 20260704_003_create_portal_matters.js
    │   │   ├── 20260704_004_create_portal_documents.js
    │   │   ├── 20260704_005_create_portal_messages.js
    │   │   ├── 20260704_006_create_audit_logs.js
    │   │   ├── 20260704_007_create_notifications.js
    │   │   ├── 20260704_008_create_file_assets.js
    │   │   ├── 20260704_009_create_client_tasks.js
    │   │   └── 20260704_010_create_client_approvals.js
    │   └── models
    │       ├── AuditLog.js
    │       ├── Client.js
    │       ├── ClientApproval.js
    │       ├── ClientTask.js
    │       ├── FileAsset.js
    │       ├── Notification.js
    │       ├── PortalAccount.js
    │       ├── PortalDocument.js
    │       ├── PortalMatter.js
    │       ├── PortalMessage.js
    │       └── index.js
    ├── domain
    │   └── clientPortal
    │       ├── constants
    │       │   └── clientPortal.constants.js
    │       ├── factories
    │       │   ├── client.factory.js
    │       │   ├── portalAccount.factory.js
    │       │   ├── portalDocument.factory.js
    │       │   ├── portalMatter.factory.js
    │       │   └── portalMessage.factory.js
    │       ├── index.js
    │       └── validators
    ├── errors
    │   └── ApiError.js
    ├── files
    │   ├── FileUploadService.js
    │   ├── file.constants.js
    │   ├── index.js
    │   └── providers
    │       └── NullStorageProvider.js
    ├── http
    │   ├── asyncHandler.js
    │   ├── errorHandler.js
    │   └── index.js
    ├── middleware
    │   └── clientPortal
    │       ├── index.js
    │       └── requireClientPortalAuth.js
    ├── notifications
    │   ├── NotificationService.js
    │   ├── index.js
    │   ├── notification.constants.js
    │   └── providers
    │       └── NullEmailProvider.js
    ├── repositories
    │   ├── BaseRepository.js
    │   ├── approvals
    │   │   ├── ClientApprovalRepository.js
    │   │   └── index.js
    │   ├── audit
    │   │   ├── AuditLogRepository.js
    │   │   └── index.js
    │   ├── clientPortal
    │   │   ├── ClientRepository.js
    │   │   ├── PortalAccountRepository.js
    │   │   ├── PortalDocumentRepository.js
    │   │   ├── PortalMatterRepository.js
    │   │   ├── PortalMessageRepository.js
    │   │   └── index.js
    │   ├── files
    │   │   ├── FileAssetRepository.js
    │   │   └── index.js
    │   ├── notifications
    │   │   ├── NotificationRepository.js
    │   │   └── index.js
    │   └── tasks
    │       ├── ClientTaskRepository.js
    │       └── index.js
    ├── routes
    │   └── clientPortal
    │       ├── activity.routes.js
    │       ├── approval.routes.js
    │       ├── auth.routes.js
    │       ├── document.routes.js
    │       ├── file.routes.js
    │       ├── index.js
    │       ├── invitation.routes.js
    │       ├── message.routes.js
    │       ├── portal.routes.js
    │       ├── task.routes.js
    │       └── timeline.routes.js
    ├── services
    │   └── clientPortal
    │       ├── ClientPortalService.js
    │       ├── PortalAccountService.js
    │       ├── PortalDocumentService.js
    │       ├── PortalMatterService.js
    │       ├── PortalMessageService.js
    │       └── index.js
    ├── tasks
    │   └── clientPortal
    │       ├── ClientTaskService.js
    │       ├── index.js
    │       └── task.constants.js
    ├── timeline
    │   └── clientPortal
    │       ├── MatterTimelineService.js
    │       └── index.js
    ├── validation
    │   ├── clientPortal
    │   │   ├── clientPortal.schemas.js
    │   │   └── index.js
    │   └── validateRequest.js
    └── workflows
        └── clientPortal
            ├── ClientPortalInvitationWorkflow.js
            └── index.js
```
