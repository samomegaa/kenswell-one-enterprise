import {
  useMemo,
  useState,
} from 'react';

function createInitialSelection(employees) {
  return new Set(
    employees
      .filter((employee) => employee.defaultSelected)
      .map((employee) => employee.id)
  );
}

export function usePayrollEmployeeSelection(model) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [selectedIds, setSelectedIds] = useState(
    () => createInitialSelection(model.employees)
  );

  const visibleEmployees = useMemo(() => {
    const term = query.trim().toLowerCase();

    return model.employees.filter((employee) => {
      const matchesStatus =
        status === 'all' ||
        employee.statusLabel === status;

      const matchesQuery =
        !term ||
        employee.displayName.toLowerCase().includes(term) ||
        employee.referenceLabel.toLowerCase().includes(term);

      return matchesStatus && matchesQuery;
    });
  }, [model.employees, query, status]);

  function toggleEmployee(employeeId) {
    setSelectedIds((current) => {
      const next = new Set(current);

      if (next.has(employeeId)) {
        next.delete(employeeId);
      } else {
        next.add(employeeId);
      }

      return next;
    });
  }

  function selectVisible() {
    setSelectedIds((current) => {
      const next = new Set(current);

      visibleEmployees.forEach((employee) => {
        next.add(employee.id);
      });

      return next;
    });
  }

  return {
    query,
    status,
    selectedIds,
    visibleEmployees,
    setQuery,
    setStatus,
    toggleEmployee,
    selectVisible,
    clearSelection: () => setSelectedIds(new Set()),
  };
}
