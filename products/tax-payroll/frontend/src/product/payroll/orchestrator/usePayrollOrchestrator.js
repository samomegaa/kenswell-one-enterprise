import { useContext } from 'react';
import {
  PayrollOrchestratorContext,
} from './PayrollOrchestratorContext';

export function usePayrollOrchestrator() {
  const context = useContext(PayrollOrchestratorContext);

  if (!context) {
    throw new Error(
      'usePayrollOrchestrator must be used inside ' +
      'PayrollOrchestratorProvider'
    );
  }

  return context;
}
