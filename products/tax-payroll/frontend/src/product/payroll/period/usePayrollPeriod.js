import { useContext } from 'react';

import {
  PayrollPeriodContext,
} from './PayrollPeriodContext';

export function usePayrollPeriod() {
  const context = useContext(PayrollPeriodContext);

  if (!context) {
    throw new Error(
      'usePayrollPeriod must be used inside ' +
      'PayrollPeriodProvider'
    );
  }

  return context;
}
