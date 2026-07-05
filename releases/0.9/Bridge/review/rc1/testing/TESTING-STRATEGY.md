# RC1-E — Testing & Smoke Test Baseline

## Objective

Create a repeatable testing baseline for Bridge before moving into RC2 production hardening.

## Current Testing Scope

RC1-E establishes smoke testing rather than full unit/integration coverage.

The smoke baseline verifies:

- RC1 baseline files
- Architecture analysis
- API response standardisation
- Security baseline
- Database review
- Constraint strategy
- Route loading
- Auth module loading
- Repository loading
- Service loading
- Workflow loading
- Audit module loading
- Notification module loading
- Client portal dashboard/documents/messages/files/tasks/approvals/activity/timeline routes
- React client portal shell
- React production build

## Why Smoke Tests First?

Bridge is still stabilising. A smoke baseline provides immediate confidence that the platform can still load and build after each RC change.

## Future Test Layers

RC2 and RC3 should add:

- Unit tests
- Repository tests
- Service tests
- Controller tests
- API integration tests
- Frontend component tests
- End-to-end browser tests
- Security regression tests

## Exit Criteria

RC1 smoke baseline should pass from a clean working tree before RC1 completion.
