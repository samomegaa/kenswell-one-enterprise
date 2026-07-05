const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../../..');

const required = [
  'deploy/docker/Dockerfile.api',
  'deploy/docker/Dockerfile.client-portal',
  'deploy/docker/docker-compose.bridge.yml',
  'deploy/docker/nginx.client-portal.conf',
  'deploy/docker/.env.bridge.example',
  'review/rc2/deployment/DOCKER-PACKAGING.md',
];

for (const file of required) {
  const full = path.join(root, file);

  if (!fs.existsSync(full)) {
    throw new Error(`Missing Docker packaging file: ${file}`);
  }

  if (!fs.readFileSync(full, 'utf8').trim()) {
    throw new Error(`Docker packaging file is empty: ${file}`);
  }
}

const rootDockerignore = path.resolve(root, '../../..', '.dockerignore');

if (!fs.existsSync(rootDockerignore)) {
  throw new Error('Missing root .dockerignore');
}

const compose = fs.readFileSync(
  path.join(root, 'deploy/docker/docker-compose.bridge.yml'),
  'utf8'
);

for (const service of ['bridge-api', 'bridge-client-portal']) {
  if (!compose.includes(service)) {
    throw new Error(`Compose file missing service: ${service}`);
  }
}

console.log('Docker runtime packaging verified');
