const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../../..');

const required = [
  'security/secret-scan.js',
  'security/route-exposure-review.js',
  'security/dependency-audit.js',
  'security/generate-security-report.js',
  'review/rc3/security/SECURITY-VALIDATION.md',
];

for (const file of required) {
  const full = path.join(root, file);

  if (!fs.existsSync(full)) {
    throw new Error(`Missing security validation file: ${file}`);
  }

  if (!fs.readFileSync(full, 'utf8').trim()) {
    throw new Error(`Security validation file is empty: ${file}`);
  }
}

console.log('Security validation suite verified');
