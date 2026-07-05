const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../../../../../..');

const required = [
  '.github/workflows/bridge-smoke.yml',
  'releases/0.9/Bridge/review/rc2/cicd/CI-CD-SMOKE-PIPELINE.md',
];

for (const file of required) {
  const full = path.join(root, file);

  if (!fs.existsSync(full)) {
    throw new Error(`Missing CI/CD file: ${file}`);
  }

  if (!fs.readFileSync(full, 'utf8').trim()) {
    throw new Error(`CI/CD file is empty: ${file}`);
  }
}

const workflow = fs.readFileSync(
  path.join(root, '.github/workflows/bridge-smoke.yml'),
  'utf8'
);

for (const expected of [
  'actions/checkout@v4',
  'actions/setup-node@v4',
  'npm ci',
  'bridge:client-portal:install',
  'bridge:rc2:config',
  'bridge:rc2:bootstrap',
  'bridge:rc2:logging',
  'bridge:rc2:http',
  'bridge:rc2:http-security',
  'bridge:rc2:errors',
  'bridge:rc2:api-contract',
  'bridge:rc2:docker',
  'bridge:rc2:deployment',
  'bridge:rc2:proxy',
  'bridge:rc1:smoke-full',
]) {
  if (!workflow.includes(expected)) {
    throw new Error(`CI workflow missing expected step/script: ${expected}`);
  }
}

console.log('CI/CD smoke pipeline verified');
