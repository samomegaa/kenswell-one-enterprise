const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const packageJson = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8')
);

const scripts = packageJson.scripts || {};

const requiredScripts = [
  'enterprise:1.0:verify',

  'enterprise:1.0:ga:a',
  'enterprise:1.0:ga:b',
  'enterprise:1.0:ga:c',
  'enterprise:1.0:ga:d',
  'enterprise:1.0:ga:e',
  'enterprise:1.0:ga:f',
  'enterprise:1.0:ga:g',

  'enterprise:1.0:ga:h:a',
  'enterprise:1.0:ga:h:b',
  'enterprise:1.0:ga:h:c',

  'enterprise:1.0:ga:h:d1',
  'enterprise:1.0:ga:h:d2',
];

const missing = requiredScripts.filter((script) => !scripts[script]);

assert(
  missing.length === 0,
  `Missing package scripts:\n${missing.join('\n')}`
);

console.log(`Package scripts checked : ${requiredScripts.length}`);
console.log(`Missing scripts         : ${missing.length}`);
console.log('✅ GA-H-D Part 3 — Package script standards verified');
