const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../../..');

const required = [
  'deploy/env/bridge.production.env.example',
  'deploy/scripts/validate-env.sh',
  'deploy/scripts/package-release.sh',
  'deploy/scripts/health-check.sh',
  'deploy/scripts/backup-release.sh',
  'deploy/scripts/rollback-release.sh',
  'deploy/scripts/verify-release.sh',
  'deploy/scripts/deploy-release.sh',
  'review/rc2/deployment/DEPLOYMENT-AUTOMATION.md',
];

for (const file of required) {
  const full = path.join(root, file);

  if (!fs.existsSync(full)) {
    throw new Error(`Missing deployment automation file: ${file}`);
  }

  if (!fs.readFileSync(full, 'utf8').trim()) {
    throw new Error(`Deployment automation file is empty: ${file}`);
  }
}

const envExample = fs.readFileSync(
  path.join(root, 'deploy/env/bridge.production.env.example'),
  'utf8'
);

for (const key of [
  'DATABASE_URL',
  'CLIENT_PORTAL_JWT_SECRET',
  'CLIENT_PORTAL_ALLOWED_ORIGINS',
  'CLIENT_PORTAL_PUBLIC_URL',
  'STORAGE_PROVIDER',
  'NOTIFICATION_PROVIDER',
]) {
  if (!envExample.includes(`${key}=`)) {
    throw new Error(`Environment example missing: ${key}`);
  }
}

console.log('Deployment automation verified');
