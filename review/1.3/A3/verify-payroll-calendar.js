'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const root = path.resolve(__dirname, '../../../');
const base = path.join(
  root,
  'products/tax-payroll/frontend/src/' +
  'workspaces/staffology/organisation'
);

[
  'payroll-calendar/index.js',
  'payroll-calendar/payrollCalendarFields.js',
  'payroll-calendar/payrollCalendarResolver.js',
  'payroll-calendar/adaptStaffologyPayrollCalendar.js',
  'payroll-calendar/payrollCalendarPresentation.js',
  'payroll-calendar/payrollCalendarPresentationModel.js',
  'payroll-calendar/PayrollPeriodCard.jsx',
  'payroll-calendar/StaffologyPayrollCalendarWorkspace.jsx',
  'payroll-calendar/payroll-calendar.css',
].forEach((file) => {
  assert.ok(
    fs.existsSync(path.join(base, file)),
    `Missing A3 file: ${file}`
  );
});

const workspace = fs.readFileSync(
  path.join(
    base,
    'StaffologyOrganisationWorkspace.jsx'
  ),
  'utf8'
);

[
  'StaffologyPayrollCalendarWorkspace',
  "id: 'payroll-calendar'",
  "label: 'Payroll Calendar'",
].forEach((token) => {
  assert.ok(
    workspace.includes(token),
    `Missing payroll calendar token: ${token}`
  );
});

console.log(
  'Staffology Payroll Calendar verification passed'
);
