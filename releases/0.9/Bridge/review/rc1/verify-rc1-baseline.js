const fs = require('fs');

const required = [
  'package.json',
  'releases/0.9/Bridge/src/routes/clientPortal/index.js',
  'releases/0.9/Bridge/src/controllers/clientPortal/index.js',
  'releases/0.9/Bridge/src/auth/clientPortal/index.js',
  'releases/0.9/Bridge/src/audit/index.js',
  'releases/0.9/Bridge/src/notifications/index.js',
  'releases/0.9/Bridge/apps/client-portal/src/App.jsx',
  'releases/0.9/Bridge/apps/client-portal/package.json',
  'releases/0.9/Bridge/review/rc1/RC1-STABILISATION-PLAN.md',
  'releases/0.9/Bridge/review/rc1/RC1-CHECKLIST.md',
];

for (const file of required) {
  if (!fs.existsSync(file)) {
    throw new Error(`Missing RC1 baseline file: ${file}`);
  }
}

console.log('RC1 baseline verified');
