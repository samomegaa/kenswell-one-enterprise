import { useContext } from 'react';

import {
  EmployeeRuntimeContext,
} from './EmployeeRuntimeContext';

export function useEmployeeRuntime() {
  const context = useContext(EmployeeRuntimeContext);

  if (!context) {
    throw new Error(
      'useEmployeeRuntime must be used within ' +
        'EmployeeRuntimeProvider'
    );
  }

  return context;
}
