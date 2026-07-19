import {
  useEmployerRuntime,
  useEmployeeRuntime,
} from '../../runtime';

export function EmployeeRuntimeGuard({
  children,
  loadingFallback = null,
  errorFallback,
  emptyFallback,
  employerFallback,
}) {
  const {
    selectedEmployer,
  } = useEmployerRuntime();

  const {
    employees,
    loading,
    error,
  } = useEmployeeRuntime();

  if (!selectedEmployer) {
    return employerFallback;
  }

  if (loading) {
    return loadingFallback;
  }

  if (error) {
    return typeof errorFallback === 'function'
      ? errorFallback(error)
      : errorFallback;
  }

  if (!employees.length) {
    return emptyFallback;
  }

  return children;
}
