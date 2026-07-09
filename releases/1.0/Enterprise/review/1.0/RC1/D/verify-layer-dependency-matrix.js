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

function extractRequires(source) {
  return [...source.matchAll(/require\(['"]([^'"]+)['"]\)/g)].map((m) => m[1]);
}

const files = walk(ENTERPRISE);
const matrix = {};

for (const file of files) {
  const fromLayer = layerOf(file);
  matrix[fromLayer] = matrix[fromLayer] || {};

  const source = fs.readFileSync(file, 'utf8');
  const requires = extractRequires(source);

  for (const target of requires) {
    const resolved = resolveRequire(file, target);

    if (!resolved) continue;

    const toLayer = layerOf(resolved);

    if (fromLayer === toLayer) continue;

    matrix[fromLayer][toLayer] = (matrix[fromLayer][toLayer] || 0) + 1;
  }
}

const dependencyEdges = Object.entries(matrix).flatMap(([from, targets]) => {
  return Object.entries(targets).map(([to, count]) => ({ from, to, count }));
});

assert(files.length > 0, 'No Enterprise files found');

console.log('Enterprise JS files scanned :', files.length);
console.log('Cross-layer dependencies    :', dependencyEdges.length);

for (const edge of dependencyEdges) {
  console.log(`${edge.from} -> ${edge.to} (${edge.count})`);
}

console.log('✅ RC1-D Part 2 — Layer dependency matrix generated');
