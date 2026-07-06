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
├── deploy
│   ├── docker
│   │   ├── .env.bridge.example
│   │   ├── Dockerfile.api
│   │   ├── Dockerfile.client-portal
│   │   ├── docker-compose.bridge.yml
│   │   └── nginx.client-portal.conf
│   ├── env
│   │   └── bridge.production.env.example
│   ├── nginx
│   │   ├── HEALTH-PROBES.md
│   │   ├── bridge.reverse-proxy.conf
│   │   └── bridge.reverse-proxy.tls.conf
│   └── scripts
│       ├── backup-release.sh
│       ├── deploy-release.sh
│       ├── health-check.sh
│       ├── package-release.sh
│       ├── rollback-release.sh
│       ├── validate-env.sh
│       └── verify-release.sh
├── docs
│   ├── ARCHITECTURE.md
│   ├── api
│   │   ├── API-CONTRACT.md
│   │   ├── API.md
│   │   └── ENDPOINT-INVENTORY.md
│   ├── database
│   │   ├── DATABASE.md
│   │   └── RC1-RELEASE-NOTES.md
│   ├── operations
│   │   ├── ENVIRONMENT.md
│   │   ├── HEALTH.md
│   │   ├── LOGGING.md
│   │   ├── OPERATIONS-REVIEW.md
│   │   ├── RUNBOOK.md
│   │   └── STARTUP.md
│   ├── releases
│   │   └── RC1-RELEASE-NOTES.md
│   ├── security
│   │   ├── SECURITY.md
│   │   └── TESTING.md
│   └── testing
│       └── TESTING.md
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
├── performance
│   ├── PERFORMANCE-REPORT.md
│   ├── api-benchmark.js
│   ├── generate-performance-report.js
│   ├── load-simulator.js
│   ├── memory-profiler.js
│   ├── performance-utils.js
│   └── results
│       └── memory-profile-results.json
├── release
│   ├── RELEASE-NOTES-RC2.md
│   ├── create-release-tag.sh
│   ├── print-release-version.js
│   └── release.json
├── review
│   ├── rc1
│   │   ├── RC1-CHECKLIST.md
│   │   ├── RC1-STABILISATION-PLAN.md
│   │   ├── api
│   │   │   ├── API-RESPONSE-STANDARD.md
│   │   │   ├── verify-all-controllers-standard.js
│   │   │   └── verify-api-standard.js
│   │   ├── architecture
│   │   │   ├── ARCHITECTURE-REVIEW.md
│   │   │   ├── TREE-SNAPSHOT.md
│   │   │   ├── analyse-architecture.js
│   │   │   ├── architecture-report.json
│   │   │   └── snapshot-tree.js
│   │   ├── database
│   │   │   ├── DATABASE-CHECKLIST.md
│   │   │   ├── DATABASE-REVIEW.md
│   │   │   ├── RELATIONSHIP-STRATEGY.md
│   │   │   ├── analyse-constraints.js
│   │   │   ├── analyse-database.js
│   │   │   ├── constraints-report.json
│   │   │   ├── database-report.json
│   │   │   └── proposed-migrations
│   │   │       └── 20260705_011_add_bridge_constraints.proposed.js
│   │   ├── security
│   │   │   ├── SECURITY-CHECKLIST.md
│   │   │   ├── SECURITY-REVIEW.md
│   │   │   └── verify-security-baseline.js
│   │   ├── testing
│   │   │   ├── TESTING-CHECKLIST.md
│   │   │   ├── TESTING-STRATEGY.md
│   │   │   └── verify-documentation.js
│   │   └── verify-rc1-baseline.js
│   ├── rc2
│   │   ├── api
│   │   │   ├── API-CONTRACT-REVIEW.md
│   │   │   ├── endpoint-inventory.json
│   │   │   ├── generate-endpoint-inventory.js
│   │   │   └── verify-api-contract.js
│   │   ├── bootstrap
│   │   │   ├── BOOTSTRAP.md
│   │   │   └── verify-bootstrap.js
│   │   ├── cicd
│   │   │   ├── CI-CD-SMOKE-PIPELINE.md
│   │   │   └── verify-ci-pipeline.js
│   │   ├── config
│   │   │   ├── CONFIGURATION.md
│   │   │   └── verify-config-layer.js
│   │   ├── deployment
│   │   │   ├── DEPLOYMENT-AUTOMATION.md
│   │   │   ├── DOCKER-PACKAGING.md
│   │   │   ├── verify-deployment-automation.js
│   │   │   └── verify-docker-packaging.js
│   │   ├── http
│   │   │   ├── API-ERROR-HANDLING.md
│   │   │   ├── HTTP-HARDENING.md
│   │   │   ├── SECURITY-HEADERS-CORS-COMPRESSION.md
│   │   │   ├── verify-error-handling.js
│   │   │   ├── verify-http-hardening.js
│   │   │   └── verify-http-security.js
│   │   ├── logging
│   │   │   ├── LOGGING.md
│   │   │   └── verify-logging.js
│   │   ├── operations
│   │   │   ├── OPERATIONS-REVIEW.md
│   │   │   └── verify-operations-docs.js
│   │   ├── proxy
│   │   │   ├── REVERSE-PROXY-TLS.md
│   │   │   └── verify-proxy-config.js
│   │   └── release
│   │       ├── RELEASE-VERSIONING.md
│   │       └── verify-release-metadata.js
│   └── rc3
│       ├── performance
│       │   ├── PERFORMANCE-VALIDATION.md
│       │   └── verify-performance-suite.js
│       ├── readiness
│       │   ├── BRIDGE-GA-READINESS.md
│       │   ├── GA-CHECKLIST.md
│       │   ├── GA-SCORE.json
│       │   ├── OPERATIONAL-READINESS.md
│       │   └── verify-ga-readiness.js
│       └── security
│           ├── SECURITY-VALIDATION.md
│           └── verify-security-validation.js
├── scripts
│   ├── check-package-hygiene.js
│   └── rc1-smoke-test.js
├── security
│   ├── SECURITY-VALIDATION-REPORT.md
│   ├── dependency-audit.js
│   ├── generate-security-report.js
│   ├── results
│   │   ├── route-exposure-review.json
│   │   └── secret-scan-results.json
│   ├── route-exposure-review.js
│   └── secret-scan.js
└── src
    ├── activity
    │   └── clientPortal
    │       ├── ClientPortalActivityService.js
    │       └── index.js
    ├── app
    │   ├── createApp.js
    │   └── index.js
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
    ├── bootstrap
    │   ├── index.js
    │   └── startServer.js
    ├── config
    │   ├── app.config.js
    │   ├── auth.config.js
    │   ├── clientPortal.config.js
    │   ├── database.config.js
    │   ├── index.js
    │   ├── logging.config.js
    │   ├── notification.config.js
    │   ├── security.config.js
    │   ├── storage.config.js
    │   └── validation.js
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
    ├── health
    │   ├── HealthService.js
    │   ├── health.routes.js
    │   └── index.js
    ├── http
    │   ├── asyncHandler.js
    │   ├── compression.js
    │   ├── errorHandler.js
    │   ├── index.js
    │   ├── notFoundHandler.js
    │   ├── rateLimit.js
    │   ├── requestId.js
    │   ├── requestLogger.js
    │   └── respond.js
    ├── logging
    │   ├── Logger.js
    │   ├── index.js
    │   └── logging.constants.js
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
    ├── security
    │   ├── corsGuard.js
    │   ├── index.js
    │   ├── security.constants.js
    │   ├── securityHeaders.js
    │   └── validateEnvironment.js
    ├── server.js
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
