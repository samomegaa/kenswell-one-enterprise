const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../../..');
const respondFile = path.join(root, 'src/http/respond.js');
const httpIndex = path.join(root, 'src/http/index.js');

if (!fs.existsSync(respondFile)) {
  throw new Error('Missing response helper');
}

if (!fs.readFileSync(httpIndex, 'utf8').includes('respond')) {
  throw new Error('HTTP index does not export respond helper');
}

const standardised = [
  'src/controllers/clientPortal/ClientPortalAuthController.js',
  'src/controllers/clientPortal/ClientPortalDashboardController.js',
  'src/controllers/clientPortal/ClientPortalActivityController.js',
];

for (const file of standardised) {
  const full = path.join(root, file);
  const content = fs.readFileSync(full, 'utf8');

  if (!content.includes('respond.success') || !content.includes('respond.failure')) {
    throw new Error(`${file} has not been standardised`);
  }
}

console.log('API response standard baseline verified');
