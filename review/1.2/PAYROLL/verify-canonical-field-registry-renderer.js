#!/usr/bin/env node
'use strict';

const assert = require('assert');

const {
  DEFAULT_PAYROLL_FIELDS,
  FIELD_CONTROLS,
  createCanonicalPayrollWorkspace,
  getValueAtPath,
  setValueAtPath,
} = require(
  '../../../src/enterprise/payroll/workspace'
);

console.log(
  'Canonical Field Registry & Dynamic Renderer'
);
console.log();

const workspace =
  createCanonicalPayrollWorkspace();

assert(DEFAULT_PAYROLL_FIELDS.length >= 20);
console.log('PASS  Canonical field metadata loaded');

assert.strictEqual(
  workspace.schema.fieldCount,
  DEFAULT_PAYROLL_FIELDS.length
);

assert(
  workspace.schema.sections.some(
    (section) =>
      section.id === 'personal' &&
      section.fields.length > 0
  )
);

console.log('PASS  Fields linked to workspace sections');

const firstName =
  workspace.fieldRegistry.getField(
    'personalDetails.firstName'
  );

assert(firstName);
assert(Object.isFrozen(firstName));
assert.strictEqual(firstName.control, 'text');
assert.strictEqual(
  firstName.providerBinding,
  'personalDetails.firstName'
);

console.log('PASS  Immutable provider bindings');

Object.values(FIELD_CONTROLS).forEach(
  (control) => {
    assert(
      workspace.renderer.hasControl(control),
      `Missing renderer for ${control}`
    );
  }
);

console.log('PASS  Default control renderer coverage');

const employee = {
  personalDetails: {
    firstName: 'Amina',
    lastName: 'Khan',
  },
  taxAndNi: {
    taxCode: '1257L',
  },
};

const descriptor =
  workspace.renderer.renderField({
    field: firstName,
    employee,
  });

assert.strictEqual(
  descriptor.component,
  'TextField'
);

assert.strictEqual(
  descriptor.value,
  'Amina'
);

console.log('PASS  Metadata-driven field rendering');

assert.strictEqual(
  getValueAtPath(
    employee,
    'taxAndNi.taxCode'
  ),
  '1257L'
);

const updated = setValueAtPath(
  employee,
  'personalDetails.firstName',
  'Fatima'
);

assert.strictEqual(
  updated.personalDetails.firstName,
  'Fatima'
);

assert.strictEqual(
  employee.personalDetails.firstName,
  'Amina'
);

console.log('PASS  Immutable nested value updates');

assert.throws(
  () => workspace.fieldRegistry.registerField({
    ...DEFAULT_PAYROLL_FIELDS[0],
  }),
  /already registered/
);

console.log('PASS  Duplicate field protection');

assert.throws(
  () => workspace.fieldRegistry.registerField({
    id: 'invalid.section.field',
    label: 'Invalid',
    sectionId: 'unknown',
    type: 'string',
    control: 'text',
  }),
  /Unknown workspace section/
);

console.log('PASS  Workspace section validation');

console.log();
console.log(
  '✅ Canonical Field Registry & Dynamic Renderer passed'
);
