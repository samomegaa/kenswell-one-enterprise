import {
  useMemo,
  useState,
} from 'react';

export function usePayrollValidationFilters(validations) {
  const [query, setQuery] = useState('');
  const [severity, setSeverity] = useState('all');

  const visibleValidations = useMemo(() => {
    const term = query.trim().toLowerCase();

    return validations.filter((validation) => {
      const matchesSeverity =
        severity === 'all' ||
        validation.severity === severity;

      const haystack = [
        validation.codeLabel,
        validation.message,
        validation.employeeLabel,
        validation.referenceLabel,
        validation.fieldLabel,
      ]
        .join(' ')
        .toLowerCase();

      return (
        matchesSeverity &&
        (!term || haystack.includes(term))
      );
    });
  }, [query, severity, validations]);

  return {
    query,
    severity,
    visibleValidations,
    setQuery,
    setSeverity,
  };
}
