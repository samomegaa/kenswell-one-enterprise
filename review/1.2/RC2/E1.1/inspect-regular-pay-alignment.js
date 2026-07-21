'use strict';

const fs = require('fs');
const path = require('path');

const discoveryPath = process.argv[2];

if (!discoveryPath) {
  console.error(
    'Usage: node inspect-regular-pay-alignment.js ' +
    '<regular-pay-discovery.json>'
  );

  process.exit(1);
}

const discovery = JSON.parse(
  fs.readFileSync(
    path.resolve(discoveryPath),
    'utf8'
  )
);

discovery.fields.forEach((field) => {
  const matches = field.matches || [];

  console.log(
    `${field.field}: ${field.status}`
  );

  matches.forEach((match) => {
    console.log(
      `  ${match.path} [${match.type}]`
    );
  });
});
