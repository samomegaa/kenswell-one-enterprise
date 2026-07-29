export const EMPLOYEE_EDIT_COMMANDS = Object.freeze({
  identity: 'UpdateIdentity',
  employment: 'UpdateEmployment',
  payroll: 'UpdatePayroll',
  tax: 'UpdateTax',
  pension: 'UpdatePension',
  leave: 'UpdateLeave',
});

export function validateEmployeeEdit({
  employerId,
  employeeId,
  section,
  payload,
}) {
  const errors = [];

  if (!employerId) errors.push('Employer is required');
  if (!employeeId) errors.push('Employee is required');
  if (!EMPLOYEE_EDIT_COMMANDS[section]) {
    errors.push('Unsupported employee edit section');
  }
  if (!payload || typeof payload !== 'object') {
    errors.push('Edit payload is required');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
