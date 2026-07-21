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

  const benefitsPanel = readFile(
    root,
    base +
      'benefits/StaffologyBenefitsPanel.jsx'
  );

  const presentation = readFile(
    root,
    base + 'benefits/benefitPresentation.js'
  );

  includesAll(
    workspace,
    [
      'StaffologyRegularPayPanel',
      'StaffologyAdditionsDeductionsPanel',
      'StaffologyLoansPanel',
      'StaffologyTaxNiPanel',
      'StaffologyOtherPanel',
      'StaffologyBenefitsPanel',
      "activeSection === 'benefits'",
    ],
    'Pay Options workspace'
  );

  includesAll(
    benefitsPanel,
    [
      'Benefits',
      'BenefitSection',
      'createBenefitPresentationModel',
    ],
    'Benefits panel'
  );

  includesAll(
    presentation,
    [
      'presentBenefitBoolean',
      'presentBenefitMoney',
      'displayBenefitValue',
    ],
    'Benefits presentation'
  );

  return pass(
    'Staffology Pay Options',
    'All Pay Options workspaces connected'
  );
};
