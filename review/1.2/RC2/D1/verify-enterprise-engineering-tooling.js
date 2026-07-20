'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const root = path.resolve(
  __dirname,
  '../../../../'
);

const required = [
  'tools/verify/run.js',
  'tools/verify/registry.js',
  'tools/verify/shared/result.js',
  'tools/verify/shared/files.js',
  'tools/verify/shared/assertions.js',
  'tools/verify/modules/staffology-catalogue.js',
  'tools/verify/modules/staffology-workspace.js',
];

required.forEach((relativePath) => {
  assert.ok(
    fs.existsSync(
      path.join(root, relativePath)
    ),
    `Missing tooling file: ${relativePath}`
  );
});

const pkg = require(
  path.join(root, 'package.json')
);

[
  'verify:staffology',
  'verify:staffology:catalogue',
  'verify:staffology:workspace',
].forEach((script) => {
  assert.ok(
    pkg.scripts?.[script],
    `Missing npm script: ${script}`
  );
});

console.log(
  'Enterprise Engineering Tooling verification passed'
);
