const path = require('path');

const ROOT = process.cwd();

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
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
  const modulePath = path.join(ROOT, 'src/enterprise', layer);
  const exported = require(modulePath);
  const exportNames = Object.keys(exported).sort();

  assert(
    exportNames.length > 0,
    `Layer has no public exports: ${layer}`
  );

  results.push({
    layer,
    exports: exportNames.length,
  });
}

console.log('Enterprise layers checked :', LAYERS.length);

for (const result of results) {
  console.log(
    `${result.layer.padEnd(16)} exports=${result.exports}`
  );
}

console.log('✅ RC1-B Part 3 — Enterprise layer exports verified');
