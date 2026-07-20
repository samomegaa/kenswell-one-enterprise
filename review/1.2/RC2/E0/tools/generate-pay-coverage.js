'use strict';

const fs = require('fs');
const path = require('path');

const source = process.argv[2];
const output = process.argv[3];

if (!source || !output) {
  console.error(
    'Usage: node generate-pay-coverage.js ' +
    '<discovery.json> <report.md>'
  );
  process.exit(1);
}

const discovery = JSON.parse(
  fs.readFileSync(path.resolve(source), 'utf8')
);

const lines = [
  '# Staffology Regular Pay Coverage',
  '',
  '| Field | Status | Discovered paths |',
  '|---|---|---|',
];

discovery.fields.forEach((field) => {
  const paths = field.matches.length
    ? field.matches
      .map((match) => `\`${match.path}\``)
      .join('<br>')
    : '—';

  lines.push(
    `| ${field.field} | ${field.status} | ${paths} |`
  );
});

fs.writeFileSync(
  path.resolve(output),
  lines.join('\n') + '\n'
);

console.log(output);
