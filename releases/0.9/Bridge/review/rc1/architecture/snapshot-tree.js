const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../../..');
const ignored = new Set(['node_modules', 'dist', '.git']);

function tree(dir, prefix = '') {
  if (!fs.existsSync(dir)) return '';

  const entries = fs.readdirSync(dir).filter((entry) => !ignored.has(entry)).sort();
  let output = '';

  entries.forEach((entry, index) => {
    const full = path.join(dir, entry);
    const last = index === entries.length - 1;
    const marker = last ? '└── ' : '├── ';

    output += `${prefix}${marker}${entry}\n`;

    if (fs.statSync(full).isDirectory()) {
      output += tree(full, `${prefix}${last ? '    ' : '│   '}`);
    }
  });

  return output;
}

const snapshot = [
  '# Bridge Architecture Tree Snapshot',
  '',
  '```text',
  'Bridge',
  tree(ROOT).trimEnd(),
  '```',
  '',
].join('\n');

fs.writeFileSync(path.join(__dirname, 'TREE-SNAPSHOT.md'), snapshot);

console.log('Tree snapshot written');
