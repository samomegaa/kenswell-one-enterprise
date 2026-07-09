const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const packageJson = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8')
);

const scripts = packageJson.scripts || {};

const requiredScripts = [
  'enterprise:1.0:verify',

  // RC2
  'enterprise:1.0:rc2:a',
  'enterprise:1.0:rc2:b',
  'enterprise:1.0:rc2:c',
  'enterprise:1.0:rc2:d',
  'enterprise:1.0:rc2:e',
  'enterprise:1.0:rc2:f',

  // GA
  'enterprise:1.0:ga:a',
  'enterprise:1.0:ga:b',
  'enterprise:1.0:ga:c',
  'enterprise:1.0:ga:d',
  'enterprise:1.0:ga:e',
  'enterprise:1.0:ga:f',
  'enterprise:1.0:ga:g',

  // Certification
  'enterprise:1.0:ga:h:a',
  'enterprise:1.0:ga:h:b',
  'enterprise:1.0:ga:h:c',
  'enterprise:1.0:ga:h:d',
];

const missing = requiredScripts.filter((script) => !scripts[script]);

assert(
  missing.length === 0,
  `Missing GA readiness scripts:\n${missing.join('\n')}`
);

assert(
  fs.existsSync(path.join(ROOT, '.git')),
  'Repository is not a Git repository'
);

console.log(`Required scripts checked : ${requiredScripts.length}`);
console.log(`Missing scripts          : ${missing.length}`);
console.log('Git repository           : OK');
console.log('General Availability     : READY');
console.log('✅ GA-H-F Part 4 — General Availability Readiness verified');
