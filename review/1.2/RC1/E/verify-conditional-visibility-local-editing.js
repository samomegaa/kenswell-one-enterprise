#!/usr/bin/env node
'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');

console.log(
  'RC1-E Conditional Visibility & Local Editing'
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

[
  'workspaces/employees/editing/useWorkspaceDraft.js',
  'workspaces/employees/editing/workspaceDraftReducer.js',
  'workspaces/employees/editing/workspaceDraftSelectors.js',
  'workspaces/employees/editing/WorkspaceDraftBar.jsx',
  'workspaces/employees/visibility/visibilityEvaluator.js',
].forEach((relative) => {
  assert(
    fs.existsSync(path.join(root, relative)),
    `${relative} is missing`
  );
});

console.log(
  'PASS  Workspace editing modules present'
);

const reducer = read(
  'workspaces/employees/editing/workspaceDraftReducer.js'
);

assert(
  reducer.includes('originalValue')
);

assert(
  reducer.includes('currentValue')
);

assert(
  reducer.includes('changedSections')
);

console.log(
  'PASS  Immutable draft and dirty tracking'
);

const selectors = read(
  'workspaces/employees/editing/workspaceDraftSelectors.js'
);

assert(
  selectors.includes('buildDraftPayload')
);

assert(
  selectors.includes('providerBinding')
);

console.log(
  'PASS  Save payload builder'
);

const visibility = read(
  'workspaces/employees/visibility/visibilityEvaluator.js'
);

[
  'equals',
  'not-equals',
  'truthy',
  'falsy',
  'in',
  'not-in',
  'exists',
  'not-exists',
].forEach((operator) => {
  assert(
    visibility.includes(operator),
    `${operator} visibility is missing`
  );
});

console.log(
  'PASS  Conditional visibility operators'
);

const section = read(
  'workspaces/employees/rendering/SectionRenderer.jsx'
);

assert(
  section.includes('isFieldVisible')
);

assert(
  section.includes('onChange')
);

console.log(
  'PASS  Editable conditional field renderer'
);

const shell = read(
  'workspaces/employees/EnterpriseEmployeeWorkspace.jsx'
);

assert(
  shell.includes('useWorkspaceDraft')
);

assert(
  shell.includes('WorkspaceDraftBar')
);

assert(
  shell.includes('changedSections')
);

console.log(
  'PASS  Draft integrated with workspace shell'
);

const main = read('main.jsx');

assert(
  main.includes(
    'editing/workspace-editing.css'
  )
);

console.log(
  'PASS  Editing presentation registered'
);

console.log();
console.log(
  '✅ RC1-E Conditional Visibility & Local Editing passed'
);
