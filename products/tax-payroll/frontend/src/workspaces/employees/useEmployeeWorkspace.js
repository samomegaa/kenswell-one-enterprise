import { useCallback, useEffect, useState } from 'react';
import { getEmployee } from './employeeApi';

export default function useEmployeeWorkspace(employeeId) {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    if (!employeeId) {
      setError(new Error('Employee ID is required'));
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try { setEmployee(await getEmployee(employeeId)); }
    catch (loadError) { setError(loadError); }
    finally { setLoading(false); }
  }, [employeeId]);

  useEffect(() => { load(); }, [load]);
  return { employee, loading, error, reload: load };
}
