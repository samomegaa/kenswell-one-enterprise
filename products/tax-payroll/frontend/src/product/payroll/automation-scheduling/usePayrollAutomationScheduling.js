import { useContext } from 'react';

import {
  PayrollAutomationSchedulingContext,
} from './PayrollAutomationSchedulingContext';

export function usePayrollAutomationScheduling() {
  const context = useContext(
    PayrollAutomationSchedulingContext
  );

  if (!context) {
    throw new Error(
      'usePayrollAutomationScheduling must be used inside ' +
      'PayrollAutomationSchedulingProvider'
    );
  }

  return context;
}
