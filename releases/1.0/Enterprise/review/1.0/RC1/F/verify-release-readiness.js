const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function exists(relativePath) {
  return fs.existsSync(path.join(ROOT, relativePath));
}

const packageJson = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8')
);

const scripts = packageJson.scripts || {};

const REQUIRED_SCRIPTS = [
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

const REQUIRED_RC_REPORTS = [
  'review/1.0/RC1/A/repository-score.json',
  'review/1.0/RC1/B/layer-score.json',
  'review/1.0/RC1/C/api-surface-score.json',
  'review/1.0/RC1/D/dependency-graph-score.json',
  'review/1.0/RC1/E/enterprise-standards-score.json',
];

const missingScripts = REQUIRED_SCRIPTS.filter((script) => !scripts[script]);
const missingReports = REQUIRED_RC_REPORTS.filter((file) => !exists(file));

assert(
  missingScripts.length === 0,
  `Missing release scripts: ${missingScripts.join(', ')}`
);

assert(
  missingReports.length === 0,
  `Missing RC reports: ${missingReports.join(', ')}`
);

console.log('Release scripts checked :', REQUIRED_SCRIPTS.length);
console.log('RC reports checked      :', REQUIRED_RC_REPORTS.length);
console.log('Missing release items   :', missingScripts.length + missingReports.length);

console.log('✅ RC1-F Part 4 — Release readiness verified');
