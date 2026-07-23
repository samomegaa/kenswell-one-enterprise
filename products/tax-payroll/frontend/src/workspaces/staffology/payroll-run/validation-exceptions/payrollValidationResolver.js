import {
  PAYROLL_VALIDATION_CONTRACT,
} from './payrollValidationContract';

function readPath(source, path) {
  return path.split('.').reduce(
    (value, key) => value?.[key],
    source
  );
}

export function resolvePayrollValidationCollection(
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
      const key of PAYROLL_VALIDATION_CONTRACT.collectionKeys
    ) {
      const value = readPath(root, key);

      if (Array.isArray(value)) {
        return {
          available: true,
          source: key,
          items: value,
        };
      }

      if (Array.isArray(value?.items)) {
        return {
          available: true,
          source: `${key}.items`,
          items: value.items,
        };
      }
    }
  }

  return {
    available: false,
    source: null,
    items: [],
  };
}

export function resolvePayrollValidationField(
  validation,
  field
) {
  const candidates =
    PAYROLL_VALIDATION_CONTRACT.fields[field] || [];

  for (const candidate of candidates) {
    const value = readPath(validation, candidate);

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
