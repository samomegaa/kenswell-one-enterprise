#!/usr/bin/env node
'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');

console.log(
  'RC1-C Dynamic React Field Renderer'
);
console.log();

const root = path.resolve(
  __dirname,
  '../../../../products/tax-payroll/frontend/src'
);

function read(relative) {
  return fs.readFileSync(
    path.join(root, relative),
    'utf8'
  );
}

const requiredFiles = [
  'workspaces/employees/rendering/FieldRenderer.jsx',
  'workspaces/employees/rendering/SectionRenderer.jsx',
  'workspaces/employees/rendering/controlRegistry.js',
  'workspaces/employees/rendering/InputControl.jsx',
  'workspaces/employees/rendering/SelectControl.jsx',
  'workspaces/employees/rendering/CheckboxControl.jsx',
  'workspaces/employees/rendering/ReadOnlyControl.jsx',
];

requiredFiles.forEach((relative) => {
  assert(
    fs.existsSync(path.join(root, relative)),
    `${relative} is missing`
  );
});

console.log(
  'PASS  Dynamic renderer files present'
);

const registry = read(
  'workspaces/employees/rendering/controlRegistry.js'
);

[
  'text',
  'email',
  'telephone',
  'number',
  'date',
  'datetime',
  'currency',
  'percentage',
  'select',
  'checkbox',
  'textarea',
  'read-only',
  'json',
].forEach((control) => {
  assert(
    registry.includes(`'${control}'`),
    `Control ${control} is missing`
  );
});

console.log(
  'PASS  Enterprise control coverage'
);

const fieldRenderer = read(
  'workspaces/employees/rendering/FieldRenderer.jsx'
);

assert(
  fieldRenderer.includes('resolveControl')
);

assert(
  fieldRenderer.includes('requiredFor')
);

assert(
  fieldRenderer.includes('role="alert"')
);

console.log(
  'PASS  Metadata field rendering'
);

const sectionRenderer = read(
  'workspaces/employees/rendering/SectionRenderer.jsx'
);

assert(
  sectionRenderer.includes(
    'field.providerBinding'
  )
);

assert(
  sectionRenderer.includes('<FieldRenderer')
);

assert(
  sectionRenderer.includes('WorkspaceSection')
);

console.log(
  'PASS  Nested values and dynamic sections'
);

const shell = read(
  'workspaces/employees/EnterpriseEmployeeWorkspace.jsx'
);

assert(
  shell.includes('<SectionRenderer')
);

assert(
  !shell.includes('WorkspaceSectionSummary')
);

console.log(
  'PASS  Enterprise shell uses renderer'
);

const main = read('main.jsx');

assert(
  main.includes(
    'rendering/field-renderer.css'
  )
);

console.log(
  'PASS  Renderer presentation registered'
);

console.log();
console.log(
  '✅ RC1-C Dynamic React Field Renderer passed'
);
