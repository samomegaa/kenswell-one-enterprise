const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function exists(relativePath) {
  return fs.existsSync(path.join(ROOT, relativePath));
}

const ENTERPRISE_DOCS = [
  'docs/enterprise/1.0-B4-enterprise-context.md',
  'docs/enterprise/1.0-B5-enterprise-audit-context-activity-trail.md',
  'docs/enterprise/1.0-B6-enterprise-workflow-unit-of-work.md',
  'docs/enterprise/1.0-B7-enterprise-transaction-boundary-outbox.md',
  'docs/enterprise/1.0-B8-enterprise-domain-service.md',
  'docs/enterprise/1.0-B9-enterprise-application-service.md',
  'docs/enterprise/1.0-B10-enterprise-api-boundary.md',
  'docs/enterprise/1.0-B11-enterprise-validation-policy-boundary.md',
  'docs/enterprise/1.0-B12-enterprise-command-query-boundary.md',
  'docs/enterprise/1.0-B13-enterprise-idempotency-retry-boundary.md',
  'docs/enterprise/1.0-B14-enterprise-observability-metrics-boundary.md',
  'docs/enterprise/1.0-B15-enterprise-logging-correlation-boundary.md',
  'docs/enterprise/1.0-B16-enterprise-security-runtime-guard-boundary.md',
];

const RC_REPORTS = [
  'review/1.0/RC1/A/architecture-report.md',
  'review/1.0/RC1/A/dependency-summary.json',
  'review/1.0/RC1/A/repository-score.json',

  'review/1.0/RC1/B/layer-report.md',
  'review/1.0/RC1/B/layer-summary.json',
  'review/1.0/RC1/B/layer-score.json',

  'review/1.0/RC1/C/api-surface-report.md',
  'review/1.0/RC1/C/api-surface-summary.json',
  'review/1.0/RC1/C/api-surface-score.json',

  'review/1.0/RC1/D/dependency-graph-report.md',
  'review/1.0/RC1/D/dependency-graph-summary.json',
  'review/1.0/RC1/D/dependency-graph-score.json',
];

const missingEnterpriseDocs = ENTERPRISE_DOCS.filter((file) => !exists(file));
const missingRcReports = RC_REPORTS.filter((file) => !exists(file));

assert(
  missingEnterpriseDocs.length === 0,
  `Missing Enterprise docs: ${missingEnterpriseDocs.join(', ')}`
);

assert(
  missingRcReports.length === 0,
  `Missing RC1 reports: ${missingRcReports.join(', ')}`
);

console.log('Enterprise docs checked :', ENTERPRISE_DOCS.length);
console.log('RC1 reports checked     :', RC_REPORTS.length);
console.log('Missing docs/reports    :', missingEnterpriseDocs.length + missingRcReports.length);

console.log('✅ RC1-E Part 4 — Review documentation standards verified');
