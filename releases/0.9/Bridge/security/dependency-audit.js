const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../../..');
const outDir = path.join(root, 'releases/0.9/Bridge/security/results');

fs.mkdirSync(outDir, { recursive: true });

const result = spawnSync('npm', ['audit', '--json'], {
  cwd: root,
  encoding: 'utf8',
});

const output = result.stdout || result.stderr || '{}';

fs.writeFileSync(
  path.join(outDir, 'npm-audit-results.json'),
  output
);

let parsed = {};

try {
  parsed = JSON.parse(output);
} catch {
  parsed = {};
}

const vulnerabilities = parsed.metadata?.vulnerabilities || {};
const total = vulnerabilities.total || 0;

console.log('Dependency audit complete');
console.log(`Total vulnerabilities: ${total}`);

if (total > 0) {
  console.log(JSON.stringify(vulnerabilities, null, 2));
}
