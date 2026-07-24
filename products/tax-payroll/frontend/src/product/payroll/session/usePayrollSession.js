import { useContext } from 'react';

import {
  PayrollSessionContext,
} from './PayrollSessionContext';

export function usePayrollSession() {
  const context =
    useContext(PayrollSessionContext);

  if (!context) {
    throw new Error(
      'usePayrollSession must be used inside ' +
      'PayrollSessionProvider'
    );
  }

  return context;
}
