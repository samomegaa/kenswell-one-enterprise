import {
  useEmployerRuntime,
} from '../../runtime';

export function EmployerRuntimeGuard({
  children,
  loadingFallback = null,
  errorFallback,
  emptyFallback,
}) {
  const {
    employers,
    loading,
    error,
  } = useEmployerRuntime();

  if (loading) {
    return loadingFallback;
  }

  if (error) {
    return typeof errorFallback === 'function'
      ? errorFallback(error)
      : errorFallback;
  }

  if (!employers.length) {
    return emptyFallback;
  }

  return children;
}
