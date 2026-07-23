import {
  resolvePayrollCalculation,
  resolvePayrollCalculationField,
} from './payrollCalculationResolver';

export function adaptStaffologyPayrollCalculation(
  employer,
  payrollRun
) {
  const resolved = resolvePayrollCalculation(
    employer,
    payrollRun
  );

  if (!resolved.available) {
    return {
      available: false,
      source: null,
      values: {},
    };
  }

  const values = {};
  const fields = [
    'grossPay',
    'netPay',
    'deductions',
    'employerCost',
    'tax',
    'employeeNi',
    'employerNi',
    'pension',
    'employeeCount',
  ];

  fields.forEach((field) => {
    values[field] =
      resolvePayrollCalculationField(
        resolved.calculation,
        field
      );
  });

  return {
    available: true,
    source: resolved.source,
    values,
  };
}
