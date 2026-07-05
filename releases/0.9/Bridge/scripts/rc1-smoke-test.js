const { execSync } = require('child_process');

const commands = [
  'npm run bridge:rc1:baseline',
  'npm run bridge:rc1:architecture',
  'npm run bridge:rc1:api-standard',
  'npm run bridge:rc1:api-standard-all',
  'npm run bridge:rc1:security',
  'npm run bridge:rc1:database',
  'npm run bridge:rc1:constraints',
  'npm run bridge:check-routes',
  'npm run bridge:check-auth',
  'npm run bridge:check-services',
  'npm run bridge:check-workflows',
  'npm run bridge:check-repos',
  'npm run bridge:check-audit',
  'npm run bridge:check-notifications',
  'npm run bridge:check-dashboard',
  'npm run bridge:check-documents',
  'npm run bridge:check-messages',
  'npm run bridge:check-files',
  'npm run bridge:check-tasks',
  'npm run bridge:check-approvals',
  'npm run bridge:check-activity',
  'npm run bridge:check-timeline',
  'npm run bridge:check-client-portal',
  'npm run bridge:client-portal:build',
];

for (const command of commands) {
  console.log(`\n▶ ${command}`);
  execSync(command, { stdio: 'inherit' });
}

console.log('\nRC1 smoke test baseline passed');
