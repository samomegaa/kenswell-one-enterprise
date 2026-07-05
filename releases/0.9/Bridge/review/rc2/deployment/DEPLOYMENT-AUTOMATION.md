# RC2-C2 — Production Deployment Automation

## Objective

Create repeatable deployment automation for Kenswell One Bridge.

## Scripts

```text
deploy/scripts/validate-env.sh
deploy/scripts/package-release.sh
deploy/scripts/backup-release.sh
deploy/scripts/rollback-release.sh
deploy/scripts/health-check.sh
deploy/scripts/verify-release.sh
deploy/scripts/deploy-release.sh

Deployment Flow
Validate environment
↓
Backup current release
↓
Package release
↓
Verify release
↓
Deploy artifact manually or through CI/CD
↓
Health check
Environment Template
deploy/env/bridge.production.env.example
Verification

Run:

releases/0.9/Bridge/deploy/scripts/verify-release.sh
Health Checks

Optional runtime health checks can be enabled with:

RUN_HEALTH_CHECKS=true releases/0.9/Bridge/deploy/scripts/verify-release.sh <env-file> <base-url>
Rollback

Rollback restores a backup archive:

releases/0.9/Bridge/deploy/scripts/rollback-release.sh <backup-archive>
Production Note

RC2-C2 prepares a repeatable deployment process. RC2-C3 should add reverse proxy, TLS, probe configuration, and production networking.
