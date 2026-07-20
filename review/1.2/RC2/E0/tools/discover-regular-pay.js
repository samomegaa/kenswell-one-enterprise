'use strict';

const fs = require('fs');
const path = require('path');

const contract = require(
  '../contracts/regular-pay-contract'
);

const {
  normalise,
  walk,
} = require('./object-walker');

const sourcePath = process.argv[2];
const outputPath = process.argv[3];

if (!sourcePath || !outputPath) {
  console.error(
    'Usage: node discover-regular-pay.js ' +
    '<workspace.json> <catalogue.json>'
  );
  process.exit(1);
}

const payload = JSON.parse(
  fs.readFileSync(path.resolve(sourcePath), 'utf8')
);

const entries = walk(payload);

const fields = Object.entries(
  contract.fields
).map(([field, aliases]) => {
  const aliasSet = new Set(
    aliases.map(normalise)
  );

  const matches = entries.filter(
    (entry) =>
      aliasSet.has(entry.normalisedKey)
  );

  return {
    field,
    aliases,
    status: matches.length
      ? 'discovered'
      : 'unresolved',
    matches: matches.map(
      ({ path: itemPath, type }) => ({
        path: itemPath,
        type,
      })
    ),
  };
});

fs.writeFileSync(
  path.resolve(outputPath),
  JSON.stringify(
    {
      contract: contract.id,
      generatedAt: new Date().toISOString(),
      fields,
    },
    null,
    2
  ) + '\n'
);

console.log(outputPath);
