export const PAY_ELEMENT_GROUPS = Object.freeze([
  {
    id: 'earnings',
    title: 'Earnings & Allowances',
    singular: 'pay element',
    paths: [
      'earnings',
      'allowances',
      'payElements.earnings',
      'payElements.allowances',
      'payroll.earnings',
      'payroll.allowances',
      'settings.earnings',
    ],
  },
  {
    id: 'deductions',
    title: 'Deductions',
    singular: 'deduction',
    paths: [
      'deductions',
      'payElements.deductions',
      'payroll.deductions',
      'settings.deductions',
    ],
  },
  {
    id: 'benefits',
    title: 'Benefits',
    singular: 'benefit',
    paths: [
      'benefits',
      'payElements.benefits',
      'payroll.benefits',
      'settings.benefits',
    ],
  },
  {
    id: 'pensions',
    title: 'Pension Schemes',
    singular: 'pension scheme',
    paths: [
      'pensionSchemes',
      'pensions',
      'payElements.pensionSchemes',
      'payroll.pensionSchemes',
      'settings.pensionSchemes',
    ],
  },
  {
    id: 'attachment-order-types',
    title: 'Attachment-order Types',
    singular: 'attachment-order type',
    paths: [
      'attachmentOrderTypes',
      'attachmentOrders.types',
      'payElements.attachmentOrderTypes',
      'settings.attachmentOrderTypes',
    ],
  },
  {
    id: 'loan-templates',
    title: 'Loan Templates',
    singular: 'loan template',
    paths: [
      'loanTemplates',
      'loans.templates',
      'payElements.loanTemplates',
      'settings.loanTemplates',
    ],
  },
]);

export const PAY_ELEMENT_FIELDS = Object.freeze({
  id: ['id', 'externalId', 'code'],
  name: ['name', 'title', 'displayName', 'description'],
  code: ['code', 'reference', 'payCode'],
  category: ['category', 'type', 'classification'],
  calculation: [
    'calculationMethod',
    'calculation',
    'method',
    'basis',
  ],
  frequency: [
    'frequency',
    'payFrequency',
    'recurrence',
  ],
  taxable: ['taxable', 'isTaxable'],
  niable: ['niable', 'isNiable', 'nationalInsurance'],
  pensionable: ['pensionable', 'isPensionable'],
  status: ['status', 'state', 'active', 'enabled'],
});
