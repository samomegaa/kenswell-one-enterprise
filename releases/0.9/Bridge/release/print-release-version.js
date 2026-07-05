const fs = require('fs');
const path = require('path');

const releaseFile = path.join(__dirname, 'release.json');
const release = JSON.parse(fs.readFileSync(releaseFile, 'utf8'));

console.log(`${release.product} ${release.release} ${release.version}`);
console.log(`Tag: ${release.tag}`);
console.log(`Status: ${release.status}`);
