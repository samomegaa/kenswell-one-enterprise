const REQUIRED = {
  identity: [
    ['firstName', 'First name is required'],
    ['lastName', 'Last name is required'],
  ],
  employment: [
    ['payrollCode', 'Payroll code is required'],
    ['startDate', 'Employment start date is required'],
  ],
  payroll: [
    ['payFrequency', 'Pay frequency is required'],
  ],
  tax: [
    ['taxCode', 'Tax code is required'],
    ['category', 'NI category is required', 'nationalInsurance'],
  ],
};

export function validateStep(stepId, draft) {
  const errors = {};

  for (const [field, message, section = stepId] of REQUIRED[stepId] || []) {
    if (!String(draft[section]?.[field] || '').trim()) {
      errors[`${section}.${field}`] = message;
    }
  }

  return errors;
}

export function validateEmployee(draft) {
  return ['identity', 'employment', 'payroll', 'tax']
    .reduce((all, step) => ({
      ...all,
      ...validateStep(step, draft),
    }), {});
}

export function hasErrors(errors) {
  return Object.keys(errors).length > 0;
}
