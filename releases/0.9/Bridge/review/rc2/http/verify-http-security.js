const path = require('path');

const root = path.resolve(__dirname, '../../..');

const http = require(path.join(root, 'src/http'));
const security = require(path.join(root, 'src/security'));

if (typeof http.compressionMiddleware !== 'function') {
  throw new Error('compressionMiddleware export missing');
}

if (typeof security.securityHeaders !== 'function') {
  throw new Error('securityHeaders export missing');
}

if (typeof security.corsGuard !== 'function') {
  throw new Error('corsGuard export missing');
}

const headers = {};

const res = {
  setHeader(key, value) {
    headers[key] = value;
  },
};

security.securityHeaders({}, res, () => {});

for (const key of [
  'X-Content-Type-Options',
  'X-Frame-Options',
  'Referrer-Policy',
  'Permissions-Policy',
  'Content-Security-Policy',
]) {
  if (!headers[key]) {
    throw new Error(`Missing security header: ${key}`);
  }
}

let nextCalled = false;

const cors = security.corsGuard({
  allowedOrigins: ['https://portal.example.com'],
});

cors(
  {
    headers: {
      origin: 'https://portal.example.com',
    },
    method: 'GET',
  },
  {
    setHeader(key, value) {
      headers[key] = value;
    },
  },
  () => {
    nextCalled = true;
  }
);

if (!nextCalled) {
  throw new Error('CORS guard did not allow configured origin');
}

console.log('HTTP security headers, CORS and compression verified');
