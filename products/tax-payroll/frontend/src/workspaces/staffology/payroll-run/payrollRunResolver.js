import {
  PAYROLL_RUN_CONTRACT,
} from './payrollRunContract';

function readPath(source, path) {
  return path.split('.').reduce(
    (value, key) => value?.[key],
    source
  );
}

export function resolvePayrollRunCollection(employer) {
  const roots = [
    employer,
    employer?.payroll,
    employer?.workspace,
    employer?.runtime,
    employer?.data,
  ];

  for (const root of roots) {
    for (const key of PAYROLL_RUN_CONTRACT.collectionKeys) {
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

export function resolvePayrollRunField(run, field) {
  const candidates =
    PAYROLL_RUN_CONTRACT.fields[field] || [];

  for (const candidate of candidates) {
    const value = readPath(run, candidate);

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
