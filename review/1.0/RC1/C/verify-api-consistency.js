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
  const names = Object.keys(exported).sort();

  const emptyNames = names.filter((name) => !name || !name.trim());

  assert(
    emptyNames.length === 0,
    `Layer ${layer} contains empty export names`
  );

  const duplicates = names.filter((name, index) => {
    return names.indexOf(name) !== index;
  });

  assert(
    duplicates.length === 0,
    `Layer ${layer} contains duplicate exports: ${duplicates.join(', ')}`
  );

  const middlewareExports = names.filter((name) => {
    return name.toLowerCase().includes('middleware');
  });

  const invalidMiddlewareExports = middlewareExports.filter((name) => {
    return !/^enterprise[A-Z].*Middleware$/.test(name);
  });

  assert(
    invalidMiddlewareExports.length === 0,
    `Layer ${layer} has invalid middleware export names: ${invalidMiddlewareExports.join(', ')}`
  );

  const errorExports = names.filter((name) => {
    return name.includes('Error');
  });

  const invalidErrorExports = errorExports.filter((name) => {
    return !name.endsWith('Error');
  });

  assert(
    invalidErrorExports.length === 0,
    `Layer ${layer} has invalid error export names: ${invalidErrorExports.join(', ')}`
  );

  const defaultExports = names.filter((name) => {
    return name.startsWith('default');
  });

  results.push({
    layer,
    exports: names.length,
    middlewareExports: middlewareExports.length,
    errorExports: errorExports.length,
    defaultExports: defaultExports.length,
  });
}

console.log('Enterprise layers checked :', results.length);

for (const result of results) {
  console.log(
    `${result.layer.padEnd(16)} exports=${String(result.exports).padEnd(2)} middleware=${result.middlewareExports} errors=${result.errorExports} defaults=${result.defaultExports}`
  );
}

console.log('✅ RC1-C Part 4 — API consistency verified');
