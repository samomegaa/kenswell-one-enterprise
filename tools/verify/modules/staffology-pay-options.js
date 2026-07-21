'use strict';

const { includesAll } = require('../shared/assertions');
const { readFile, requireFile } = require('../shared/files');
const { pass } = require('../shared/result');

module.exports = function verifyPayOptions(root) {
  const base =
    'products/tax-payroll/frontend/src/workspaces/staffology/pay-options/';

  requireFile(
    root,
    'review/1.2/RC2/E0/catalogue/regular-pay-discovery.json'
  );

  const workspace = readFile(root, base + 'StaffologyPayOptionsWorkspace.jsx');
  const regularPay = readFile(root, base + 'StaffologyRegularPayPanel.jsx');
  const additions = readFile(
    root,
    base + 'additions-deductions/StaffologyAdditionsDeductionsPanel.jsx'
  );
  const loans = readFile(root, base + 'loans/StaffologyLoansPanel.jsx');
  const taxNi = readFile(root, base + 'tax-ni/StaffologyTaxNiPanel.jsx');

  includesAll(
    workspace,
    [
      'StaffologyRegularPayPanel',
      'StaffologyAdditionsDeductionsPanel',
      'StaffologyLoansPanel',
      'StaffologyTaxNiPanel',
      "activeSection === 'tax-ni'",
    ],
    'Pay Options workspace'
  );

  includesAll(regularPay, ['Schedule', 'Monthly amount', 'Annual salary'], 'Regular Pay panel');
  includesAll(additions, ['Additions', 'Deductions'], 'Additions & Deductions panel');
  includesAll(loans, ['Loans', 'LoanSection'], 'Loans panel');
  includesAll(
    taxNi,
    ['Tax & NI', 'Income Tax', 'National Insurance', 'Student and postgraduate loans'],
    'Tax & NI panel'
  );

  return pass(
    'Staffology Pay Options',
    'Regular Pay, Additions & Deductions, Loans and Tax & NI connected'
  );
};
