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
  const exported = require(path.join(ROOT, 'src/enterprise', layer));
  const exportNames = Object.keys(exported).sort();

  const errorExports = exportNames.filter((name) => {
    return name.endsWith('Error');
  });

  assert(
    errorExports.length > 0,
    `Layer ${layer} has no exported Error classes`
  );

  for (const errorName of errorExports) {
    assert(
      typeof exported[errorName] === 'function',
      `Error export is not a function/class in ${layer}: ${errorName}`
    );
  }

  results.push({
    layer,
    errors: errorExports.length,
  });
}

console.log('Enterprise layers checked :', results.length);

for (const result of results) {
  console.log(`${result.layer.padEnd(16)} error-exports=${result.errors}`);
}

console.log('✅ RC1-E Part 1 — Error standards verified');
