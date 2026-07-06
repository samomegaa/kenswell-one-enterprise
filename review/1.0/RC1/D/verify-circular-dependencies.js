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
  if (!target.startsWith('.')) return null;

  let resolved = path.resolve(path.dirname(fromFile), target);

  if (fs.existsSync(resolved) && fs.statSync(resolved).isDirectory()) {
    resolved = path.join(resolved, 'index.js');
  }

  if (!resolved.endsWith('.js')) {
    resolved = `${resolved}.js`;
  }

  if (!resolved.startsWith(ENTERPRISE)) return null;
  if (!fs.existsSync(resolved)) return null;

  return resolved;
}

function detectCycles(graph) {
  const cycles = [];
  const visiting = new Set();
  const visited = new Set();

  function visit(node, stack) {
    if (visiting.has(node)) {
      const start = stack.indexOf(node);
      cycles.push([...stack.slice(start), node]);
      return;
    }

    if (visited.has(node)) return;

    visiting.add(node);

    for (const next of graph[node] || []) {
      visit(next, [...stack, next]);
    }

    visiting.delete(node);
    visited.add(node);
  }

  for (const node of Object.keys(graph)) {
    visit(node, [node]);
  }

  return cycles;
}

const files = walk(ENTERPRISE);
const graph = {};

for (const file of files) {
  const fromLayer = layerOf(file);
  graph[fromLayer] = graph[fromLayer] || [];

  const source = fs.readFileSync(file, 'utf8');

  for (const target of extractRequires(source)) {
    const resolved = resolveRequire(file, target);
    if (!resolved) continue;

    const toLayer = layerOf(resolved);

    if (fromLayer === toLayer) continue;
    if (!graph[fromLayer].includes(toLayer)) {
      graph[fromLayer].push(toLayer);
    }
  }
}

const cycles = detectCycles(graph);

assert(
  cycles.length === 0,
  `Circular Enterprise layer dependencies found: ${JSON.stringify(cycles, null, 2)}`
);

console.log('Enterprise JS files scanned :', files.length);
console.log('Layer graph nodes           :', Object.keys(graph).length);
console.log('Circular dependencies       :', cycles.length);
console.log('✅ RC1-D Part 4 — Circular dependency check passed');
