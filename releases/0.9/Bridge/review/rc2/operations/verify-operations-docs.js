const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../../..');

const requiredDocuments = [
  'docs/operations/ENVIRONMENT.md',
  'docs/operations/STARTUP.md',
  'docs/operations/HEALTH.md',
  'docs/operations/LOGGING.md',
  'docs/operations/RUNBOOK.md',
  'review/rc2/operations/OPERATIONS-REVIEW.md',
];

const missing = [];
const empty = [];

for (const document of requiredDocuments) {
  const fullPath = path.join(ROOT, document);

  if (!fs.existsSync(fullPath)) {
    missing.push(document);
    continue;
  }

  const stats = fs.statSync(fullPath);

  if (!stats.isFile()) {
    missing.push(document);
    continue;
  }

  const content = fs.readFileSync(fullPath, 'utf8').trim();

  if (!content.length) {
    empty.push(document);
  }
}

if (missing.length || empty.length) {
  console.error('\nRC2 Operations Documentation Verification Failed\n');

  if (missing.length) {
    console.error('Missing files:');
    for (const file of missing) {
      console.error(`  - ${file}`);
    }
  }

  if (empty.length) {
    console.error('\nEmpty files:');
    for (const file of empty) {
      console.error(`  - ${file}`);
    }
  }

  process.exit(1);
}

console.log('Operations documentation verified');
console.log(`Verified ${requiredDocuments.length} documentation files.`);
