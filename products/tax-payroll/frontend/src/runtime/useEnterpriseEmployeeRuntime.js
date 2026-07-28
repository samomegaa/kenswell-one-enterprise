import {
  useCallback,
  useMemo,
  useState,
} from 'react';

import {
  getEnterpriseEmployee,
  getEnterpriseEmployeeContext,
  listEnterpriseEmployees,
  queryEnterpriseEmployees,
} from '../services/employee-enterprise-api';

const EMPTY_STATE = Object.freeze({
  data: null,
  loading: false,
  error: null,
});

export function useEnterpriseEmployeeRuntime() {
  const [state, setState] = useState(EMPTY_STATE);

  const run = useCallback(async (operation) => {
    setState({
      data: null,
      loading: true,
      error: null,
    });

    try {
      const data = await operation();

      setState({
        data,
        loading: false,
        error: null,
      });

      return data;
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error,
      });

      throw error;
    }
  }, []);

  const actions = useMemo(() => ({
    listEmployees: () => run(
      () => listEnterpriseEmployees()
    ),
    queryEmployees: (query) => run(
      () => queryEnterpriseEmployees(query)
    ),
    getEmployeeContext: () => run(
      () => getEnterpriseEmployeeContext()
    ),
    getEmployee: (employeeRef) => run(
      () => getEnterpriseEmployee(employeeRef)
    ),
    reset: () => setState(EMPTY_STATE),
  }), [run]);

  return {
    ...state,
    ...actions,
  };
}
