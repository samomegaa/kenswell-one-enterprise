'use strict';

const {
  includesAll,
} = require('../shared/assertions');

const {
  readFile,
  requireFile,
} = require('../shared/files');

const {
  pass,
} = require('../shared/result');

module.exports = function verifyPayOptions(root) {
  const base =
    'products/tax-payroll/frontend/src/' +
    'workspaces/staffology/pay-options/';

  requireFile(
    root,
    'review/1.2/RC2/E0/catalogue/' +
    'regular-pay-discovery.json'
  );

  const fields = readFile(
    root,
    base + 'regularPayFields.js'
  );

  const adapter = readFile(
    root,
    base + 'adaptStaffologyRegularPay.js'
  );

  const panel = readFile(
    root,
    base + 'StaffologyRegularPayPanel.jsx'
  );

  includesAll(
    fields,
    [
      'REGULAR_PAY_SCHEDULE_FIELDS',
      'REGULAR_PAY_AMOUNT_FIELDS',
      'REGULAR_PAY_SETTINGS_FIELDS',
    ],
    'Regular Pay contract'
  );

  includesAll(
    adapter,
    [
      'schedule',
      'monthlyAmount',
      'annualSalary',
      'payCode',
      'proRataAdjustments',
      'baseHourlyRate',
      'baseDailyRate',
    ],
    'Regular Pay adapter'
  );

  includesAll(
    panel,
    [
      'Schedule',
      'Basis',
      'Monthly amount',
      'Annual salary',
      'Base hourly rate',
      'Base daily rate',
    ],
    'Regular Pay panel'
  );

  return pass(
    'Staffology Pay Options',
    'Regular Pay contract aligned'
  );
};
