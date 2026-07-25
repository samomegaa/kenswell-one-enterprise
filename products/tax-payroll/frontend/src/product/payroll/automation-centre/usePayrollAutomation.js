import { useContext } from 'react';
import {
  PayrollAutomationContext,
} from './PayrollAutomationContext';

export function usePayrollAutomation() {
  const context = useContext(PayrollAutomationContext);

  if (!context) {
    throw new Error(
      'usePayrollAutomation must be used inside PayrollAutomationProvider'
    );
  }

  return context;
}
