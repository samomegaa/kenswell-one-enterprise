const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../../..');

const requiredDocuments = [
  'docs/ARCHITECTURE.md',
  'docs/api/API.md',
  'docs/security/SECURITY.md',
  'docs/database/DATABASE.md',
  'docs/testing/TESTING.md',
  'docs/releases/RC1-RELEASE-NOTES.md',
];

const missing = [];

for (const document of requiredDocuments) {
  const full = path.join(ROOT, document);

  if (!fs.existsSync(full)) {
    missing.push(document);
    continue;
  }

  const stats = fs.statSync(full);

  if (!stats.isFile()) {
    missing.push(document);
    continue;
  }

  const content = fs.readFileSync(full, 'utf8').trim();

  if (!content.length) {
    missing.push(`${document} (empty)`);
  }
}

if (missing.length) {
  console.error('\nDocumentation verification failed.\n');
  console.error('Missing or empty documents:\n');

  for (const item of missing) {
    console.error(` - ${item}`);
  }

  process.exit(1);
}

console.log('Documentation baseline verified');
console.log(`Verified ${requiredDocuments.length} documentation files.`);
