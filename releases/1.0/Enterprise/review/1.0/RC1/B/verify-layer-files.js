const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function listFiles(relativePath) {
  const fullPath = path.join(ROOT, relativePath);

  if (!fs.existsSync(fullPath)) {
    return [];
  }

  return fs
    .readdirSync(fullPath, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .sort();
}

const LAYERS = [
  'api',
  'application',
  'audit',
  'context',
  'cqrs',
  'domain',
  'logging',
  'observability',
  'policy',
  'resilience',
  'security',
  'transactions',
  'workflow',
];

const results = [];

for (const layer of LAYERS) {
  const files = listFiles(`src/enterprise/${layer}`);
  const hasIndex = files.includes('index.js');
  const implementationFiles = files.filter((file) => file !== 'index.js');

  assert(hasIndex, `Layer missing index.js: ${layer}`);
  assert(
    implementationFiles.length > 0,
    `Layer has no implementation files: ${layer}`
  );

  results.push({
    layer,
    files: files.length,
    implementationFiles: implementationFiles.length,
  });
}

console.log('Enterprise layers checked :', LAYERS.length);

for (const result of results) {
  console.log(
    `${result.layer.padEnd(16)} files=${result.files} implementation=${result.implementationFiles}`
  );
}

console.log('✅ RC1-B Part 2 — Enterprise layer files verified');
