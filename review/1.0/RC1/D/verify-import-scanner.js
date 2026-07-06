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

function extractRequires(source) {
  const matches = [...source.matchAll(/require\(['"]([^'"]+)['"]\)/g)];

  return matches.map((match) => match[1]);
}

function getLayer(file) {
  const relative = path.relative(ENTERPRISE, file);
  return relative.split(path.sep)[0];
}

const files = walk(ENTERPRISE);
const imports = [];

for (const file of files) {
  const source = fs.readFileSync(file, 'utf8');
  const requires = extractRequires(source);

  for (const target of requires) {
    if (!target.startsWith('.')) continue;

    imports.push({
      file: path.relative(ROOT, file),
      layer: getLayer(file),
      target,
    });
  }
}

assert(files.length > 0, 'No Enterprise source files found');

console.log('Enterprise JS files scanned :', files.length);
console.log('Relative require imports    :', imports.length);

console.log('✅ RC1-D Part 1 — Import scanner verified');
