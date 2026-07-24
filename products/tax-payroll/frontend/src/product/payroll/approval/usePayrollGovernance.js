import { useContext } from 'react';
import {
  PayrollGovernanceContext,
} from './PayrollGovernanceContext';

export function usePayrollGovernance() {
  const context = useContext(PayrollGovernanceContext);

  if (!context) {
    throw new Error(
      'usePayrollGovernance must be used inside ' +
      'PayrollGovernanceProvider'
    );
  }

  return context;
}
