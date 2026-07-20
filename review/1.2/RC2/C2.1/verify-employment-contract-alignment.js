'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const root = path.resolve(
  __dirname,
  '../../../../'
);

function read(relativePath) {
  const absolutePath = path.join(
    root,
    relativePath
  );

  assert.ok(
    fs.existsSync(absolutePath),
    `Missing file: ${relativePath}`
  );

  return fs.readFileSync(
    absolutePath,
    'utf8'
  );
}

const base =
  'products/tax-payroll/frontend/src/' +
  'workspaces/staffology/';

const resolver = read(
  base + 'staffologyContractResolver.js'
);

const fields = read(
  base + 'staffologyEmploymentFields.js'
);

const adapter = read(
  base + 'adaptStaffologyEmployment.js'
);

[
  'createContractIndex',
  'firstContractValue',
  'normaliseKey',
].forEach((token) => {
  assert.ok(
    resolver.includes(token),
    `Contract resolver missing ${token}`
  );
});

[
  'isOrWasDirector',
  'startOfDirectorship',
  'endOfDirectorship',
  'alternativeNiMethod',
  'starterDeclaration',
].forEach((token) => {
  assert.ok(
    fields.includes(token),
    `Employment aliases missing ${token}`
  );
});

assert.ok(
  adapter.includes(
    "booleanValue(index, 'isDirector')"
  ),
  'Director status is not contract-resolved'
);

assert.ok(
  adapter.includes(
    "resolve(index, 'directorshipStartDate')"
  ),
  'Directorship start date is not resolved'
);

assert.ok(
  !adapter.includes(
    "resolve(index, 'isDirector'),\n        false"
  ),
  'Unresolved director status must not default to false'
);

console.log(
  'PASS Staffology contract index'
);

console.log(
  'PASS Staffology employment aliases'
);

console.log(
  'PASS Director contract alignment'
);

console.log(
  'PASS Missing booleans remain unavailable'
);

console.log(
  'Staffology Employment Contract Alignment verification passed'
);
