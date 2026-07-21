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

  const workspace = readFile(
    root,
    base + 'StaffologyPayOptionsWorkspace.jsx'
  );

  const otherPanel = readFile(
    root,
    base + 'other/StaffologyOtherPanel.jsx'
  );

  const presentation = readFile(
    root,
    base + 'other/otherPresentation.js'
  );

  includesAll(
    workspace,
    [
      'StaffologyRegularPayPanel',
      'StaffologyAdditionsDeductionsPanel',
      'StaffologyLoansPanel',
      'StaffologyTaxNiPanel',
      'StaffologyOtherPanel',
      "activeSection === 'other'",
    ],
    'Pay Options workspace'
  );

  includesAll(
    otherPanel,
    [
      'PayrollControlsSection',
      'WorkingArrangementSection',
      'ReportingIndicatorsSection',
      'createOtherPresentationModel',
    ],
    'Other Pay Options panel'
  );

  includesAll(
    presentation,
    [
      'presentOtherBoolean',
      'presentPaymentMethod',
      'BACS',
      'Manual payment',
    ],
    'Other Pay Options presentation'
  );

  return pass(
    'Staffology Pay Options',
    'Other Pay Options workspace connected'
  );
};
