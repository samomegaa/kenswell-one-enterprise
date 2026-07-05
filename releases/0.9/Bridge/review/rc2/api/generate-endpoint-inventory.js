const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../../..');
const routesDir = path.join(root, 'src/routes/clientPortal');

const routeFiles = fs.readdirSync(routesDir)
  .filter((file) => file.endsWith('.routes.js'))
  .sort();

const methodRegex = /router\.(get|post|patch|put|delete)\(\s*['"`]([^'"`]+)['"`]/g;

const mountMap = {
  'auth.routes.js': '/auth',
  'invitation.routes.js': '/invitations',
  'portal.routes.js': '/portal',
  'document.routes.js': '/documents',
  'message.routes.js': '/messages',
  'timeline.routes.js': '/timeline',
  'file.routes.js': '/files',
  'task.routes.js': '/tasks',
  'approval.routes.js': '/approvals',
  'activity.routes.js': '/activity',
};

const endpoints = [];

for (const file of routeFiles) {
  const content = fs.readFileSync(path.join(routesDir, file), 'utf8');
  const mount = mountMap[file] || '';
  let match;

  while ((match = methodRegex.exec(content)) !== null) {
    const method = match[1].toUpperCase();
    const localPath = match[2];
    const fullPath = `/api/client-portal${mount}${localPath === '/' ? '' : localPath}`;

    endpoints.push({
      method,
      path: fullPath,
      file,
    });
  }
}

const markdown = [
  '# Client Portal Endpoint Inventory',
  '',
  '| Method | Path | Route File |',
  '|---|---|---|',
  ...endpoints.map((endpoint) => `| ${endpoint.method} | \`${endpoint.path}\` | ${endpoint.file} |`),
  '',
  `Total endpoints: ${endpoints.length}`,
  '',
].join('\n');

fs.writeFileSync(path.join(root, 'docs/api/ENDPOINT-INVENTORY.md'), markdown);

fs.writeFileSync(
  path.join(__dirname, 'endpoint-inventory.json'),
  JSON.stringify({
    generatedAt: new Date().toISOString(),
    total: endpoints.length,
    endpoints,
  }, null, 2)
);

console.log('Endpoint inventory generated');
console.log(`Endpoints: ${endpoints.length}`);
