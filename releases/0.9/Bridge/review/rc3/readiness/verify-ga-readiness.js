const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../../..');

const requiredFiles = [
  // RC1
  'review/rc1/architecture/ARCHITECTURE-REVIEW.md',
  'review/rc1/security/SECURITY-REVIEW.md',
  'review/rc1/database/DATABASE-REVIEW.md',

  // RC2
  'review/rc2/config/CONFIGURATION.md',
  'review/rc2/bootstrap/BOOTSTRAP.md',
  'review/rc2/logging/LOGGING.md',
  'review/rc2/http/HTTP-HARDENING.md',
  'review/rc2/http/API-ERROR-HANDLING.md',
  'review/rc2/api/API-CONTRACT-REVIEW.md',
  'review/rc2/deployment/DEPLOYMENT-AUTOMATION.md',
  'review/rc2/proxy/REVERSE-PROXY-TLS.md',
  'review/rc2/cicd/CI-CD-SMOKE-PIPELINE.md',
  'review/rc2/release/RELEASE-VERSIONING.md',

  // RC3
  'review/rc3/performance/PERFORMANCE-VALIDATION.md',
  'review/rc3/security/SECURITY-VALIDATION.md',
  'review/rc3/readiness/OPERATIONAL-READINESS.md',
  'review/rc3/readiness/GA-CHECKLIST.md',
  'review/rc3/readiness/BRIDGE-GA-READINESS.md',

  // Release
  'release/release.json',
  'release/RELEASE-NOTES-RC2.md',

  // Docker
  'deploy/docker/docker-compose.bridge.yml',

  // NGINX
  'deploy/nginx/bridge.reverse-proxy.conf',

  // Performance
  'performance/PERFORMANCE-REPORT.md',

  // Security
  'security/SECURITY-VALIDATION-REPORT.md'
];

const missing = [];

for (const file of requiredFiles) {

  const full = path.join(root, file);

  if (!fs.existsSync(full)) {
    missing.push(file);
    continue;
  }

  const content = fs.readFileSync(full, 'utf8').trim();

  if (!content.length) {
    missing.push(file + ' (empty)');
  }

}

if (missing.length) {

  console.error('\nGA Readiness Verification Failed\n');

  missing.forEach(file => console.error(' -', file));

  process.exit(1);

}

console.log('Bridge GA readiness verified');

console.log(`Verified ${requiredFiles.length} readiness artefacts.`);