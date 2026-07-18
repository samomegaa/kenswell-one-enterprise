#!/usr/bin/env node
'use strict';

const assert = require('assert');

const {
  createVisibilityRule,
  evaluateVisibilityRule,
  evaluateVisibilityRules,
  isFieldVisible,
  createVisibleWorkspaceSchema,
  createCanonicalPayrollWorkspace,
} = require(
  '../../../src/enterprise/payroll/workspace'
);

console.log(
  'Canonical Payroll Conditional Visibility Engine'
);
console.log();

const equalsRule = createVisibilityRule({
  field: 'employmentDetails.isDirector',
  operator: 'equals',
  value: true,
});

assert(Object.isFrozen(equalsRule));
console.log('PASS  Immutable visibility rules');

assert.strictEqual(
  evaluateVisibilityRule(
    equalsRule,
    {
      employmentDetails: {
        isDirector: true,
      },
    }
  ),
  true
);

assert.strictEqual(
  evaluateVisibilityRule(
    equalsRule,
    {
      employmentDetails: {
        isDirector: false,
      },
    }
  ),
  false
);

console.log('PASS  Equality rule evaluation');

assert.strictEqual(
  evaluateVisibilityRules(
    [
      createVisibilityRule({
        field: 'taxAndNi.studentLoan',
        operator: 'in',
        value: ['plan-1', 'plan-2'],
      }),
      createVisibilityRule({
        field: 'employmentDetails.isLeaver',
        operator: 'falsy',
      }),
    ],
    {
      taxAndNi: {
        studentLoan: 'plan-2',
      },
      employmentDetails: {
        isLeaver: false,
      },
    },
    'all'
  ),
  true
);

console.log('PASS  Compound visibility rules');

const workspace =
  createCanonicalPayrollWorkspace();

const directorField =
  workspace.fieldRegistry.getField(
    'employmentDetails.directorshipDetails.startDate'
  );

assert.strictEqual(
  isFieldVisible(
    directorField,
    {
      employmentDetails: {
        isDirector: false,
      },
    }
  ),
  false
);

assert.strictEqual(
  isFieldVisible(
    directorField,
    {
      employmentDetails: {
        isDirector: true,
      },
    }
  ),
  true
);

console.log('PASS  Field visibility evaluation');

const hiddenDescriptor =
  workspace.renderer.renderField({
    field: directorField,
    employee: {
      employmentDetails: {
        isDirector: false,
      },
    },
  });

assert.strictEqual(hiddenDescriptor, null);
console.log('PASS  Hidden fields are not rendered');

const visibleDescriptor =
  workspace.renderer.renderField({
    field: directorField,
    employee: {
      employmentDetails: {
        isDirector: true,
        directorshipDetails: {
          startDate: '2026-04-06',
        },
      },
    },
  });

assert.strictEqual(
  visibleDescriptor.component,
  'DateField'
);

console.log('PASS  Visible fields render dynamically');

const nonDirectorSchema =
  createVisibleWorkspaceSchema({
    schema: workspace.schema,
    employee: {
      employmentDetails: {
        isDirector: false,
      },
    },
  });

const employmentSection =
  nonDirectorSchema.sections.find(
    (section) => section.id === 'employment'
  );

assert(
  !employmentSection.fields.some(
    (field) =>
      field.id ===
      'employmentDetails.directorshipDetails.startDate'
  )
);

console.log('PASS  Visible workspace projection');

const directorSchema =
  createVisibleWorkspaceSchema({
    schema: workspace.schema,
    employee: {
      employmentDetails: {
        isDirector: true,
      },
    },
  });

assert(
  directorSchema.sections
    .find((section) => section.id === 'employment')
    .fields.some(
      (field) =>
        field.id ===
        'employmentDetails.directorshipDetails.startDate'
    )
);

console.log('PASS  Conditional field inclusion');

assert.throws(
  () => createVisibilityRule({
    field: 'employmentDetails.isDirector',
    operator: 'unsupported',
  }),
  /Unsupported visibility operator/
);

console.log('PASS  Unsupported operators rejected');

assert(Object.isFrozen(nonDirectorSchema));
assert(Object.isFrozen(nonDirectorSchema.sections));

console.log('PASS  Immutable visibility projection');

console.log();
console.log(
  '✅ Canonical Payroll Conditional Visibility Engine passed'
);
