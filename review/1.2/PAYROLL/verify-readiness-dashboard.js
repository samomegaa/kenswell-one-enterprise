#!/usr/bin/env node
'use strict';

const assert = require('assert');

const {
  READINESS_LEVELS,
  createCanonicalPayrollWorkspace,
  createReadinessDashboard,
} = require(
  '../../../src/enterprise/payroll/workspace'
);

console.log('Canonical Payroll Readiness Dashboard');
console.log();

const workspace =
  createCanonicalPayrollWorkspace();

const incompleteEmployee = {
  personalDetails: {
    firstName: 'Amina',
    lastName: 'Khan',
  },
};

const incomplete =
  createReadinessDashboard({
    engine: workspace.readinessEngine,
    schema: workspace.schema,
    employee: incompleteEmployee,
    employeeVersion: '7',
    workspaceVersion: '1.0.0',
    contractFingerprint: 'test-fingerprint',
    calculatedAt: '2026-07-18T10:00:00.000Z',
  });

assert(incomplete.levels.creation);
assert(incomplete.levels.payroll);
assert(incomplete.levels.rti);
console.log('PASS  Three readiness levels evaluated');

assert.strictEqual(
  incomplete.levels.creation.status,
  'incomplete'
);

assert(
  incomplete.levels.creation.missing > 0
);

console.log('PASS  Missing creation fields detected');

assert(
  incomplete.levels.payroll.score >= 0 &&
  incomplete.levels.payroll.score <= 100
);

assert(
  incomplete.levels.rti.score >= 0 &&
  incomplete.levels.rti.score <= 100
);

console.log('PASS  Completion percentages calculated');

assert(
  incomplete.levels.rti.missingFields.some(
    (field) => field.sectionId === 'address'
  )
);

console.log('PASS  Missing-field report includes sections');

assert.strictEqual(
  incomplete.timeline.employeeVersion,
  '7'
);

assert.strictEqual(
  incomplete.timeline.contractFingerprint,
  'test-fingerprint'
);

console.log('PASS  Evaluation timeline recorded');

assert(
  incomplete.sections.some(
    (section) =>
      section.sectionId === 'personal'
  )
);

assert(
  incomplete.sections.some(
    (section) =>
      section.status === 'incomplete'
  )
);

console.log('PASS  Section readiness aggregated');

const completeEmployee = {
  personalDetails: {
    firstName: 'Amina',
    lastName: 'Khan',
    dateOfBirth: '1990-04-12',
    address: {
      line1: '1 High Street',
      postCode: 'SW1A 1AA',
    },
  },
  employmentDetails: {
    payrollCode: 'EMP001',
    starterDetails: {
      startDate: '2026-04-06',
    },
  },
  taxAndNi: {
    taxCode: '1257L',
    niTable: 'A',
  },
  payOptions: {
    payScheduleId: 'monthly',
  },
};

const complete =
  workspace.readinessEngine.evaluate(
    completeEmployee
  );

assert.strictEqual(
  complete[READINESS_LEVELS.CREATION].status,
  'ready'
);

assert.strictEqual(
  complete[READINESS_LEVELS.PAYROLL].status,
  'ready'
);

assert.strictEqual(
  complete[READINESS_LEVELS.RTI].status,
  'ready'
);

console.log('PASS  Fully populated employee becomes ready');

assert(Object.isFrozen(incomplete));
assert(Object.isFrozen(incomplete.levels));
assert(Object.isFrozen(incomplete.sections));
assert(Object.isFrozen(incomplete.timeline));

console.log('PASS  Immutable readiness model');

console.log();
console.log(
  '✅ Canonical Payroll Readiness Dashboard passed'
);
