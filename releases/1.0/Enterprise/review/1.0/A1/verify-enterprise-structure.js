const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../../..');

const required = [
  'apps/bridge/README.md',
  'apps/practice/README.md',
  'apps/finance/README.md',
  'apps/compliance/README.md',
  'apps/identity/README.md',
  'apps/analytics/README.md',
  'apps/admin/README.md',

  'packages/config/README.md',
  'packages/auth/README.md',
  'packages/logging/README.md',
  'packages/security/README.md',
  'packages/events/README.md',
  'packages/database/README.md',
  'packages/ui/README.md',
  'packages/sdk/README.md',
  'packages/observability/README.md',

  'infrastructure/docker/README.md',
  'infrastructure/nginx/README.md',
  'infrastructure/monitoring/README.md',
  'infrastructure/deployment/README.md',

  'docs/enterprise/ENTERPRISE-ARCHITECTURE.md',
  'review/1.0/A1/ENTERPRISE-RESTRUCTURE.md',

  'releases/0.9/Bridge',
];

const missing = [];

for (const item of required) {
  const full = path.join(root, item);

  if (!fs.existsSync(full)) {
    missing.push(item);
  }
}

if (missing.length) {
  console.error('Enterprise structure verification failed');
  for (const item of missing) {
    console.error(` - ${item}`);
  }
  process.exit(1);
}

console.log('Enterprise repository structure verified');
console.log(`Verified ${required.length} structure items`);
