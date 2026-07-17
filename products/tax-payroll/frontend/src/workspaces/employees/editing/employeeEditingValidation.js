const REQUIRED_FIELDS = [
  ['identity.firstName', 'First name is required'],
  ['identity.lastName', 'Last name is required'],
  ['employment.payrollCode', 'Payroll code is required'],
  ['employment.startDate', 'Employment start date is required'],
  ['payroll.payFrequency', 'Pay frequency is required'],
  ['tax.taxCode', 'Tax code is required'],
  ['nationalInsurance.category', 'NI category is required'],
];

function readValue(source, path) {
  return path.split('.').reduce(
    (value, key) => value?.[key],
    source
  );
}

export function validateEmployeeUpdate(employee) {
  return REQUIRED_FIELDS.reduce((errors, [path, message]) => {
    if (!String(readValue(employee, path) || '').trim()) {
      errors[path] = message;
    }

    return errors;
  }, {});
}

export function hasValidationErrors(errors) {
  return Object.keys(errors).length > 0;
}
