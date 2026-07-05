const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../../..');

const required = [
  'deploy/nginx/bridge.reverse-proxy.conf',
  'deploy/nginx/bridge.reverse-proxy.tls.conf',
  'deploy/nginx/HEALTH-PROBES.md',
  'review/rc2/proxy/REVERSE-PROXY-TLS.md',
];

for (const file of required) {
  const full = path.join(root, file);

  if (!fs.existsSync(full)) {
    throw new Error(`Missing proxy file: ${file}`);
  }

  if (!fs.readFileSync(full, 'utf8').trim()) {
    throw new Error(`Proxy file is empty: ${file}`);
  }
}

const proxy = fs.readFileSync(
  path.join(root, 'deploy/nginx/bridge.reverse-proxy.conf'),
  'utf8'
);

for (const expected of [
  'upstream bridge_api',
  'upstream bridge_client_portal',
  'location /api/client-portal/',
  'location /health',
  'location /ready',
  'location /live',
  'X-Request-Id',
  'X-Forwarded-For',
  'X-Forwarded-Proto',
]) {
  if (!proxy.includes(expected)) {
    throw new Error(`Reverse proxy config missing: ${expected}`);
  }
}

const tls = fs.readFileSync(
  path.join(root, 'deploy/nginx/bridge.reverse-proxy.tls.conf'),
  'utf8'
);

for (const expected of [
  'listen 443 ssl',
  'ssl_certificate',
  'Strict-Transport-Security',
  'TLSv1.2 TLSv1.3',
]) {
  if (!tls.includes(expected)) {
    throw new Error(`TLS proxy config missing: ${expected}`);
  }
}

console.log('Reverse proxy, TLS and health probe configuration verified');
