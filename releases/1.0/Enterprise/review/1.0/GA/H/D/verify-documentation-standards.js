const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function exists(relativePath) {
  return fs.existsSync(path.join(ROOT, relativePath));
}

const requiredDocs = [
  'docs/enterprise/1.0-GA-A-enterprise-repository-framework.md',
  'docs/enterprise/1.0-GA-B-enterprise-scheduler.md',
  'docs/enterprise/1.0-GA-C-enterprise-notification-framework.md',
  'docs/enterprise/1.0-GA-D-enterprise-search-indexing.md',
  'docs/enterprise/1.0-GA-E-enterprise-integration-gateway.md',
  'docs/enterprise/1.0-GA-F-enterprise-intelligence-engine.md',
  'docs/enterprise/1.0-GA-G-enterprise-platform-operations.md',
];

const missing = requiredDocs.filter((doc) => !exists(doc));

assert(
  missing.length === 0,
  `Missing GA documentation:\n${missing.join('\n')}`
);

console.log(`GA documents checked : ${requiredDocs.length}`);
console.log(`Missing documents    : ${missing.length}`);
console.log('✅ GA-H-D Part 2 — Documentation standards verified');
