const fs = require('fs');

const forbiddenTrackedPaths = [
  'node_modules/',
  'releases/0.9/Bridge/apps/client-portal/node_modules/',
];

const requiredFiles = [
  '.gitignore',
  'package.json',
  'package-lock.json',
  'releases/0.9/Bridge/apps/client-portal/package.json',
  'releases/0.9/Bridge/apps/client-portal/package-lock.json',
  'releases/0.9/Bridge/apps/client-portal/.gitignore',
];

for (const file of requiredFiles) {
  if (!fs.existsSync(file)) {
    throw new Error(`Missing package hygiene file: ${file}`);
  }
}

const rootGitignore = fs.readFileSync('.gitignore', 'utf8');

if (!rootGitignore.includes('node_modules/')) {
  throw new Error('Root .gitignore must ignore node_modules/');
}

const portalGitignore = fs.readFileSync(
  'releases/0.9/Bridge/apps/client-portal/.gitignore',
  'utf8'
);

if (!portalGitignore.includes('node_modules/')) {
  throw new Error('Client portal .gitignore must ignore node_modules/');
}

console.log('Package hygiene baseline verified');
console.log('Forbidden tracked paths should remain untracked:', forbiddenTrackedPaths.join(', '));
