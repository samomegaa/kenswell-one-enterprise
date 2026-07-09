const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function exists(relativePath) {
  return fs.existsSync(path.join(ROOT, relativePath));
}

const runtimeServices = [
  'composition',
  'di',
  'lifecycle',
  'configuration',
  'plugins',
  'bootstrap',
];

const missing = [];

for (const service of runtimeServices) {
  if (!exists(`src/enterprise/${service}/index.js`)) {
    missing.push(`src/enterprise/${service}/index.js`);
  }
}

assert(
  missing.length === 0,
  `Missing runtime service files:\n${missing.join('\n')}`
);

console.log(`Runtime services checked : ${runtimeServices.length}`);
console.log(`Missing services         : ${missing.length}`);
console.log('✅ GA-H-C Part 1 — Enterprise Runtime Structure verified');
