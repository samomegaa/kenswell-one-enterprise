import {
  PAYROLL_CALCULATION_CONTRACT,
} from './payrollCalculationContract';

function readPath(source, path) {
  return path.split('.').reduce(
    (value, key) => value?.[key],
    source
  );
}

function resolveField(source, field) {
  const candidates =
    PAYROLL_CALCULATION_CONTRACT.fields[field] || [];

  for (const candidate of candidates) {
    const value = readPath(source, candidate);

    if (
      value !== undefined &&
      value !== null &&
      value !== ''
    ) {
      return value;
    }
  }

  return null;
}

export function resolvePayrollCalculation(
  employer,
  payrollRun
) {
  const roots = [
    payrollRun?.source,
    payrollRun,
    employer?.payroll,
    employer?.runtime,
    employer?.workspace,
    employer,
  ];

  for (const root of roots) {
    if (!root) continue;

    for (
      const key of PAYROLL_CALCULATION_CONTRACT.objectKeys
    ) {
      const value = readPath(root, key);

      if (value && typeof value === 'object') {
        return {
          available: true,
          source: key,
          calculation: value,
        };
      }
    }

    const grossPay = resolveField(root, 'grossPay');
    const netPay = resolveField(root, 'netPay');

    if (grossPay !== null || netPay !== null) {
      return {
        available: true,
        source: 'inline',
        calculation: root,
      };
    }
  }

  return {
    available: false,
    source: null,
    calculation: null,
  };
}

export function resolvePayrollCalculationField(
  calculation,
  field
) {
  return resolveField(calculation, field);
}
