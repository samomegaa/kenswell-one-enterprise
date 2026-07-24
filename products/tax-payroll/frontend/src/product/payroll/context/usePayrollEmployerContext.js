import { useMemo } from 'react';

import {
  useEmployerRuntime,
} from '../../../runtime';

import {
  createPayrollRuntimeWorkspace,
} from './createPayrollRuntimeWorkspace';

export function usePayrollEmployerContext() {
  const runtime = useEmployerRuntime();

  const runtimeWorkspace = useMemo(
    () => createPayrollRuntimeWorkspace(
      runtime.selectedEmployer
    ),
    [runtime.selectedEmployer]
  );

  return Object.freeze({
    employers: runtime.employers,
    selectedEmployer: runtime.selectedEmployer,
    runtimeWorkspace,
    loading: runtime.loading,
    error: runtime.error,
    selectEmployer: runtime.selectEmployer,
    refreshEmployers: runtime.refreshEmployers,
  });
}
