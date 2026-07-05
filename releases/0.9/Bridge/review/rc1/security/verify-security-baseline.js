const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../../..');

const required = [
  'src/security/index.js',
  'src/security/validateEnvironment.js',
  'src/security/securityHeaders.js',
  'src/security/corsGuard.js',
  'src/security/security.constants.js',
  'src/auth/clientPortal/password.util.js',
  'src/auth/clientPortal/token.util.js',
  'src/middleware/clientPortal/requireClientPortalAuth.js',
  'src/files/file.constants.js',
];

for (const file of required) {
  const full = path.join(root, file);
  if (!fs.existsSync(full)) {
    throw new Error(`Missing security baseline file: ${file}`);
  }
}

const security = require(path.join(root, 'src/security'));

const validation = security.validateEnvironment({
  DATABASE_URL: 'postgres://user:pass@localhost:5432/kenswell_one',
  CLIENT_PORTAL_JWT_SECRET: 'development-secret-long-enough',
});

if (!validation.valid) {
  throw new Error('Environment validation failed');
}

console.log('Security baseline verified');
console.log(Object.keys(security));
