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

  const middlewareExports = exportNames.filter((name) => {
    return name.toLowerCase().includes('middleware');
  });

  assert(
    middlewareExports.length > 0,
    `Layer ${layer} has no middleware export`
  );

  for (const middlewareName of middlewareExports) {
    assert(
      /^enterprise[A-Z].*Middleware$/.test(middlewareName),
      `Invalid middleware name in ${layer}: ${middlewareName}`
    );

    assert(
      typeof exported[middlewareName] === 'function',
      `Middleware export is not a function in ${layer}: ${middlewareName}`
    );
  }

  results.push({
    layer,
    middleware: middlewareExports.length,
  });
}

console.log('Enterprise layers checked :', results.length);

for (const result of results) {
  console.log(`${result.layer.padEnd(16)} middleware-exports=${result.middleware}`);
}

console.log('✅ RC1-E Part 2 — Middleware standards verified');
