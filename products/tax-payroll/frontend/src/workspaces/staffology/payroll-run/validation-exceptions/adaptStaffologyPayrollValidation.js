import {
  resolvePayrollValidationCollection,
  resolvePayrollValidationField,
} from './payrollValidationResolver';

import {
  normaliseValidationSeverity,
} from './payrollValidationPresentation';

function adaptValidation(validation, index) {
  const id =
    resolvePayrollValidationField(validation, 'id') ||
    `payroll-validation-${index + 1}`;

  return {
    id: String(id),
    code:
      resolvePayrollValidationField(validation, 'code'),
    message:
      resolvePayrollValidationField(validation, 'message') ||
      'Validation detail unavailable',
    severity: normaliseValidationSeverity(
      resolvePayrollValidationField(
        validation,
        'severity'
      )
    ),
    employeeName:
      resolvePayrollValidationField(
        validation,
        'employeeName'
      ),
    employeeReference:
      resolvePayrollValidationField(
        validation,
        'employeeReference'
      ),
    field:
      resolvePayrollValidationField(validation, 'field'),
    source: validation,
  };
}

export function adaptStaffologyPayrollValidation(
  employer,
  payrollRun
) {
  const collection =
    resolvePayrollValidationCollection(
      employer,
      payrollRun
    );

  return {
    available: collection.available,
    source: collection.source,
    validations: collection.items.map(adaptValidation),
  };
}
