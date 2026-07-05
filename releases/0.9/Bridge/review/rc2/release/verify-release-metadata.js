const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../../..');

const releaseFile = path.join(root, 'release/release.json');
const notesFile = path.join(root, 'release/RELEASE-NOTES-RC2.md');

if (!fs.existsSync(releaseFile)) {
  throw new Error('Missing release metadata file');
}

if (!fs.existsSync(notesFile)) {
  throw new Error('Missing RC2 release notes');
}

const release = JSON.parse(fs.readFileSync(releaseFile, 'utf8'));

const required = [
  'product',
  'release',
  'version',
  'phase',
  'status',
  'tag',
  'previousTag',
];

for (const key of required) {
  if (!release[key]) {
    throw new Error(`Release metadata missing: ${key}`);
  }
}

if (release.version !== '0.9.0-rc2') {
  throw new Error('Unexpected release version');
}

if (release.tag !== 'v0.9.0-rc2') {
  throw new Error('Unexpected release tag');
}

const notes = fs.readFileSync(notesFile, 'utf8');

for (const expected of [
  'RC2-A',
  'RC2-B',
  'RC2-C',
  'RC2-D',
  'v0.9.0-rc2',
]) {
  if (!notes.includes(expected)) {
    throw new Error(`Release notes missing: ${expected}`);
  }
}

console.log('Release metadata verified');
console.log(`${release.product} ${release.release} ${release.version}`);
