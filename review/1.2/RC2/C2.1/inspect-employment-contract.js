'use strict';

const fs = require('fs');
const path = require('path');

const sourcePath = process.argv[2];

if (!sourcePath) {
  console.error(
    'Usage: node inspect-employment-contract.js ' +
    '<workspace-json>'
  );

  process.exit(1);
}

const payload = JSON.parse(
  fs.readFileSync(
    path.resolve(sourcePath),
    'utf8'
  )
);

const targetNames = new Set([
  'startdate',
  'employmentstartdate',
  'starterdeclaration',
  'declaration',
  'payrollcode',
  'payrollidchange',
  'changeofpayrollid',
  'workplacepostcode',
  'isdirector',
  'director',
  'isorwasdirector',
  'directorshipstartdate',
  'directorstartdate',
  'startofdirectorship',
  'directorshipenddate',
  'directorenddate',
  'endofdirectorship',
  'alternativenimethod',
  'nialternativemethod',
  'alternativemethod',
]);

function normalise(value) {
  return String(value)
    .replace(/[^a-zA-Z0-9]/g, '')
    .toLowerCase();
}

function walk(value, currentPath = []) {
  if (!value || typeof value !== 'object') {
    return;
  }

  Object.entries(value).forEach(([key, item]) => {
    const itemPath = [...currentPath, key];

    if (
      targetNames.has(normalise(key)) &&
      (
        item === null ||
        typeof item !== 'object'
      )
    ) {
      console.log(
        `${itemPath.join('.')} = ${JSON.stringify(item)}`
      );
    }

    if (item && typeof item === 'object') {
      walk(item, itemPath);
    }
  });
}

walk(payload);
