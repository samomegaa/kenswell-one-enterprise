'use strict';

const fs = require('fs');
const path = require('path');

const input = process.argv[2];
const output = process.argv[3];

if (!input || !output) {
  console.error(
    'Usage: node create-pay-shape.js ' +
    '<workspace.json> <shape.json>'
  );
  process.exit(1);
}

const payload = JSON.parse(
  fs.readFileSync(path.resolve(input), 'utf8')
);

function shape(value, depth = 0) {
  if (depth >= 10) return 'maximum-depth';
  if (value === null) return 'null';

  if (Array.isArray(value)) {
    return {
      $type: 'array',
      $item: value.length
        ? shape(value[0], depth + 1)
        : null,
    };
  }

  if (typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(
        ([key, item]) => [
          key,
          shape(item, depth + 1),
        ]
      )
    );
  }

  return typeof value;
}

fs.writeFileSync(
  path.resolve(output),
  JSON.stringify(shape(payload), null, 2) + '\n'
);

console.log(output);
