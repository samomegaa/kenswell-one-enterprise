import {
  displayValidationValue,
} from './payrollValidationPresentation';

function presentValidation(validation) {
  return {
    ...validation,
    codeLabel:
      displayValidationValue(validation.code),
    employeeLabel:
      displayValidationValue(validation.employeeName),
    referenceLabel:
      displayValidationValue(
        validation.employeeReference
      ),
    fieldLabel:
      displayValidationValue(validation.field),
  };
}

export function createPayrollValidationPresentationModel(
  contract
) {
  const validations =
    contract.validations.map(presentValidation);

  return {
    available: contract.available,
    source: contract.source,
    validations,
    counts: {
      total: validations.length,
      error: validations.filter(
        (item) => item.severity === 'Error'
      ).length,
      warning: validations.filter(
        (item) => item.severity === 'Warning'
      ).length,
      information: validations.filter(
        (item) => item.severity === 'Information'
      ).length,
    },
  };
}
