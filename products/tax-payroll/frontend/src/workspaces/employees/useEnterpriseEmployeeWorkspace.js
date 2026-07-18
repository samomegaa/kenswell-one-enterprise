import {
  useCallback,
  useEffect,
  useState,
} from 'react';

import {
  getEmployeeWorkspace,
} from './employeeApi';

import {
  adaptEmployeeWorkspace,
} from './employeeWorkspaceAdapter';

export default function useEnterpriseEmployeeWorkspace(
  employeeId
) {
  const [workspace, setWorkspace] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  const load = useCallback(async () => {
    if (!employeeId) {
      setError(
        new Error('Employee ID is required')
      );
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const payload =
        await getEmployeeWorkspace(employeeId);

      setWorkspace(
        adaptEmployeeWorkspace(payload)
      );
    } catch (loadError) {
      setError(loadError);
    } finally {
      setLoading(false);
    }
  }, [employeeId]);

  useEffect(() => {
    load();
  }, [load]);

  return {
    workspace,
    employee: workspace?.employee || null,
    loading,
    error,
    reload: load,
  };
}
