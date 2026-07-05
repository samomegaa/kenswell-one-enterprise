const path = require('path');

const root = path.resolve(__dirname, '../../..');

const {
  createConfig,
} = require(path.join(root, 'src/config'));

const config = createConfig({
  NODE_ENV: 'test',
  APP_NAME: 'Kenswell One Test',
  PORT: '4000',
  DATABASE_URL: 'postgres://user:pass@localhost:5432/kenswell_one',
  CLIENT_PORTAL_JWT_SECRET: 'development-secret-long-enough',
  CLIENT_PORTAL_ALLOWED_ORIGINS: 'http://localhost:5174,https://portal.example.com',
  RATE_LIMIT_MAX: '200',
  STORAGE_PROVIDER: 'null_storage',
});

const requiredSections = [
  'app',
  'auth',
  'database',
  'security',
  'notifications',
  'storage',
  'clientPortal',
];

for (const section of requiredSections) {
  if (!config[section]) {
    throw new Error(`Missing config section: ${section}`);
  }
}

if (config.app.port !== 4000) {
  throw new Error('PORT was not parsed as a number');
}

if (config.security.allowedOrigins.length !== 2) {
  throw new Error('CLIENT_PORTAL_ALLOWED_ORIGINS was not parsed correctly');
}

let failedAsExpected = false;

try {
  createConfig({
    DATABASE_URL: 'postgres://user:pass@localhost:5432/kenswell_one',
    CLIENT_PORTAL_JWT_SECRET: 'short',
  });
} catch (error) {
  failedAsExpected = true;
}

if (!failedAsExpected) {
  throw new Error('Short JWT secret should fail validation');
}

console.log('Enterprise configuration layer verified');
console.log(Object.keys(config));
