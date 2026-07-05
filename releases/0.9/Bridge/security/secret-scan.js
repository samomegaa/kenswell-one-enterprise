const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

const ignoredDirs = new Set([
  'node_modules',
  'dist',
  '.git',
  'results',
]);

const patterns = [
  { name: 'private_key', regex: /-----BEGIN (RSA |EC |OPENSSH |)?PRIVATE KEY-----/ },
  { name: 'aws_access_key', regex: /AKIA[0-9A-Z]{16}/ },
  { name: 'hardcoded_jwt_secret', regex: /CLIENT_PORTAL_JWT_SECRET\s*=\s*(?!change-me|development-secret|dev-secret)[^\s]+/i },
  { name: 'database_url_password', regex: /postgres:\/\/[^:\s]+:[^@\s]+@/i },
];

const allowlistedFiles = new Set([
  'deploy/docker/.env.bridge.example',
  'deploy/env/bridge.production.env.example',
  'deploy/scripts/validate-env.sh',
  'review/rc1/security/verify-security-baseline.js',
  'review/rc2/bootstrap/verify-bootstrap.js',
  'review/rc2/config/verify-config-layer.js',
  'review/rc2/http/verify-http-hardening.js',
  'review/rc2/logging/verify-logging.js',
]);

const findings = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ignoredDirs.has(entry.name)) continue;

    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(full);
      continue;
    }

    if (!/\.(js|json|md|env|example|yml|yaml|conf|sh)$/.test(entry.name)) continue;

    const relative = path.relative(root, full);

    if (allowlistedFiles.has(relative)) {
      continue;
    }

    const content = fs.readFileSync(full, 'utf8');

    for (const pattern of patterns) {
      if (pattern.regex.test(content)) {
        findings.push({
          type: pattern.name,
          file: relative,
        });
      }
    }
  }
}

walk(root);

const outDir = path.join(root, 'security/results');
fs.mkdirSync(outDir, { recursive: true });

fs.writeFileSync(
  path.join(outDir, 'secret-scan-results.json'),
  JSON.stringify({
    generatedAt: new Date().toISOString(),
    findings,
  }, null, 2)
);

if (findings.length) {
  console.error('Secret scan findings detected');
  console.error(JSON.stringify(findings, null, 2));
  process.exit(1);
}

console.log('Secret scan passed');
