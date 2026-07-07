const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function readPackageJson() {
  return JSON.parse(
    fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8')
  );
}

const REQUIRED_RELEASE_SCRIPTS = [
  'enterprise:1.0:verify',

  'enterprise:1.0:a1',
  'enterprise:1.0:a2',
  'enterprise:1.0:a3',
  'enterprise:1.0:a4',
  'enterprise:1.0:a5',

  'enterprise:1.0:b1',
  'enterprise:1.0:b2',
  'enterprise:1.0:b3',
  'enterprise:1.0:b4',
  'enterprise:1.0:b5',
  'enterprise:1.0:b6',
  'enterprise:1.0:b7',
  'enterprise:1.0:b8',
  'enterprise:1.0:b9',
  'enterprise:1.0:b10',
  'enterprise:1.0:b11',
  'enterprise:1.0:b12',
  'enterprise:1.0:b13',
  'enterprise:1.0:b14',
  'enterprise:1.0:b15',
  'enterprise:1.0:b16',

  'enterprise:rc1:a',
  'enterprise:rc1:b',
  'enterprise:rc1:c',
  'enterprise:rc1:d',
  'enterprise:rc1:e',
];

const packageJson = readPackageJson();
const scripts = packageJson.scripts || {};

const missing = REQUIRED_RELEASE_SCRIPTS.filter((scriptName) => {
  return !scripts[scriptName];
});

assert(
  missing.length === 0,
  `Missing release readiness scripts: ${missing.join(', ')}`
);

console.log('Release scripts checked :', REQUIRED_RELEASE_SCRIPTS.length);
console.log('Missing scripts         :', missing.length);
console.log('✅ RC1-F Part 4 — Release readiness verified');
