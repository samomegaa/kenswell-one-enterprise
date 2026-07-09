const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function exists(relativePath) {
  return fs.existsSync(path.join(ROOT, relativePath));
}

const services = [
  'repository',
  'scheduler',
  'notification',
  'search',
  'integration',
  'ai',
  'operations',
];

const missing = [];

for (const service of services) {
  const base = `src/enterprise/${service}`;

  [
    'index.js',
  ].forEach(file => {
    if (!exists(`${base}/${file}`)) {
      missing.push(`${base}/${file}`);
    }
  });
}

assert(
  missing.length === 0,
  `Missing platform service files:\n${missing.join('\n')}`
);

console.log(`Platform services checked : ${services.length}`);
console.log(`Missing services          : ${missing.length}`);
console.log('✅ GA-H-B Part 1 — Platform Service Structure verified');
