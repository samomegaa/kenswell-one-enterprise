'use strict';
const { includesAll } = require('../shared/assertions');
const { readFile, requireFile } = require('../shared/files');
const { pass } = require('../shared/result');

module.exports = function verifyPayOptions(root) {
  const base = 'products/tax-payroll/frontend/src/workspaces/staffology/pay-options/';
  requireFile(root, 'review/1.2/RC2/E0/catalogue/regular-pay-discovery.json');
  const workspace = readFile(root, base + 'StaffologyPayOptionsWorkspace.jsx');
  const taxNiPanel = readFile(root, base + 'tax-ni/StaffologyTaxNiPanel.jsx');
  const presentation = readFile(root, base + 'tax-ni/taxNiPresentation.js');

  includesAll(workspace, [
    'StaffologyRegularPayPanel',
    'StaffologyAdditionsDeductionsPanel',
    'StaffologyLoansPanel',
    'StaffologyTaxNiPanel',
    "activeSection === 'tax-ni'",
  ], 'Pay Options workspace');

  includesAll(taxNiPanel, [
    'createTaxNiPresentationModel',
    'TaxDetailsSection',
    'NationalInsuranceSection',
    'LoanIndicatorsSection',
  ], 'Tax & NI panel');

  includesAll(presentation, [
    'presentTaxBasis',
    'Cumulative',
    'Week 1 / Month 1',
    'presentStudentLoan',
    'presentMoney',
  ], 'Tax & NI presentation');

  return pass('Staffology Pay Options', 'Tax & NI contract presentation aligned');
};
