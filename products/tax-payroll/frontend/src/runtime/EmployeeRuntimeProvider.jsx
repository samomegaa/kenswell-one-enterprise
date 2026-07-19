import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  enterpriseRuntimeApi,
} from '../services/enterprise-runtime-api';

import {
  useEmployerRuntime,
} from './useEmployerRuntime';

import {
  EmployeeRuntimeContext,
} from './EmployeeRuntimeContext';

import {
  readSelectedEmployeeId,
  writeSelectedEmployeeId,
} from './employeeRuntimeStorage';

function resolveInitialEmployee(
  employerId,
  employees
) {
  const storedId =
    readSelectedEmployeeId(employerId);

  return (
    employees.find(
      (employee) => employee.id === storedId
    ) ||
    null
  );
}

export function EmployeeRuntimeProvider({
  children,
  api = enterpriseRuntimeApi,
}) {
  const {
    selectedEmployer,
  } = useEmployerRuntime();

  const [employees, setEmployees] = useState([]);
  const [
    selectedEmployee,
    setSelectedEmployee,
  ] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const employerId = selectedEmployer?.id || null;

  const refreshEmployees = useCallback(async () => {
    if (!employerId) {
      setEmployees([]);
      setSelectedEmployee(null);
      setError(null);
      return [];
    }

    setLoading(true);
    setError(null);

    try {
      const result =
        await api.listEmployerEmployees(employerId);

      const nextEmployees = Array.isArray(result)
        ? result
        : [];

      setEmployees(nextEmployees);

      setSelectedEmployee((current) => {
        const currentMatch = nextEmployees.find(
          (employee) =>
            employee.id === current?.id
        );

        const next =
          currentMatch ||
          resolveInitialEmployee(
            employerId,
            nextEmployees
          );

        writeSelectedEmployeeId(
          employerId,
          next?.id || null
        );

        return next;
      });

      return nextEmployees;
    } catch (runtimeError) {
      setError(runtimeError);
      setEmployees([]);
      setSelectedEmployee(null);
      throw runtimeError;
    } finally {
      setLoading(false);
    }
  }, [api, employerId]);

  const selectEmployee = useCallback(
    (employeeOrId) => {
      const employeeId =
        typeof employeeOrId === 'string'
          ? employeeOrId
          : employeeOrId?.id;

      const next = employees.find(
        (employee) => employee.id === employeeId
      );

      if (!next) {
        throw new Error(
          `Employee ${employeeId} is unavailable`
        );
      }

      setSelectedEmployee(next);
      writeSelectedEmployeeId(employerId, next.id);
      return next;
    },
    [employees, employerId]
  );

  const clearEmployee = useCallback(() => {
    setSelectedEmployee(null);
    writeSelectedEmployeeId(employerId, null);
  }, [employerId]);

  useEffect(() => {
    refreshEmployees().catch(() => {});
  }, [refreshEmployees]);

  const value = useMemo(
    () => ({
      employees,
      selectedEmployee,
      loading,
      error,
      refreshEmployees,
      selectEmployee,
      clearEmployee,
    }),
    [
      employees,
      selectedEmployee,
      loading,
      error,
      refreshEmployees,
      selectEmployee,
      clearEmployee,
    ]
  );

  return (
    <EmployeeRuntimeContext.Provider value={value}>
      {children}
    </EmployeeRuntimeContext.Provider>
  );
}
