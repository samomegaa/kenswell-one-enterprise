import { useContext } from 'react';

import {
  EmployerRuntimeContext,
} from './EmployerRuntimeContext';

export function useEmployerRuntime() {
  const context = useContext(EmployerRuntimeContext);

  if (!context) {
    throw new Error(
      'useEmployerRuntime must be used within ' +
        'EmployerRuntimeProvider'
    );
  }

  return context;
}
