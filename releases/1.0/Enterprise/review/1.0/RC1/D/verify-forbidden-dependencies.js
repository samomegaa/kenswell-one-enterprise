const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const ENTERPRISE = path.join(ROOT, 'src/enterprise');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function walk(dir) {
  const files = [];

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const absolute = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...walk(absolute));
    } else if (entry.isFile() && entry.name.endsWith('.js')) {
      files.push(absolute);
    }
  }

  return files;
}

function layerOf(file) {
  const relative = path.relative(ENTERPRISE, file);
  return relative.split(path.sep)[0];
}

function extractRequires(source) {
  return [...source.matchAll(/require\(['"]([^'"]+)['"]\)/g)].map((m) => m[1]);
}

function resolveRequire(fromFile, target) {
  if (!target.startsWith('.')) {
    return null;
  }

  let resolved = path.resolve(path.dirname(fromFile), target);

  if (fs.existsSync(resolved) && fs.statSync(resolved).isDirectory()) {
    resolved = path.join(resolved, 'index.js');
  }

  if (!resolved.endsWith('.js')) {
    resolved = `${resolved}.js`;
  }

  if (!resolved.startsWith(ENTERPRISE)) {
    return null;
  }

  if (!fs.existsSync(resolved)) {
    return null;
  }

  return resolved;
}

const ALLOWED_CROSS_LAYER = {
  api: ['application', 'domain'],
  application: ['domain'],
  audit: [],
  context: [],
  cqrs: [],
  domain: [],
  logging: [],
  observability: [],
  policy: [],
  resilience: [],
  security: [],
  transactions: [],
  workflow: [],
};

const files = walk(ENTERPRISE);
const violations = [];

for (const file of files) {
  const fromLayer = layerOf(file);
  const source = fs.readFileSync(file, 'utf8');

  for (const target of extractRequires(source)) {
    const resolved = resolveRequire(file, target);

    if (!resolved) continue;

    const toLayer = layerOf(resolved);

    if (fromLayer === toLayer) continue;

    const allowed = ALLOWED_CROSS_LAYER[fromLayer] || [];

    if (!allowed.includes(toLayer)) {
      violations.push({
        from: path.relative(ROOT, file),
        fromLayer,
        to: path.relative(ROOT, resolved),
        toLayer,
      });
    }
  }
}

assert(
  violations.length === 0,
  `Forbidden dependencies found: ${JSON.stringify(violations, null, 2)}`
);

console.log('Enterprise JS files scanned :', files.length);
console.log('Forbidden dependencies      :', violations.length);
console.log('✅ RC1-D Part 3 — Forbidden dependency check passed');
