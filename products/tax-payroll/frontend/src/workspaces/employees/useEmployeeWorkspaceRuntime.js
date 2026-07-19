import {
  useCallback,
  useState,
} from 'react';

import {
  enterpriseRuntimeApi,
} from '../../services/enterprise-runtime-api';

import {
  useEmployerRuntime,
  useEmployeeRuntime,
} from '../../runtime';

export function useEmployeeWorkspaceRuntime({
  api = enterpriseRuntimeApi,
} = {}) {
  const {
    selectedEmployer,
  } = useEmployerRuntime();

  const {
    selectedEmployee,
  } = useEmployeeRuntime();

  const [workspace, setWorkspace] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadWorkspace = useCallback(
    async (employee = selectedEmployee) => {
      if (!selectedEmployer?.id || !employee?.id) {
        throw new Error(
          'Employer and employee selections are required'
        );
      }

      setLoading(true);
      setError(null);

      try {
        const result =
          await api.getEmployerEmployeeWorkspace(
            selectedEmployer.id,
            employee.id
          );

        const runtimeWorkspace = {
          employer: selectedEmployer,
          employee,
          workspace: result,
        };

        setWorkspace(runtimeWorkspace);
        return runtimeWorkspace;
      } catch (runtimeError) {
        setError(runtimeError);
        throw runtimeError;
      } finally {
        setLoading(false);
      }
    },
    [
      api,
      selectedEmployer,
      selectedEmployee,
    ]
  );

  const clearWorkspace = useCallback(() => {
    setWorkspace(null);
    setError(null);
  }, []);

  return {
    workspace,
    loading,
    error,
    loadWorkspace,
    clearWorkspace,
  };
}
