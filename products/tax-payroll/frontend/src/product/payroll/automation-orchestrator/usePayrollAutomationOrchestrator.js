import { useContext } from 'react';
import {
  PayrollAutomationOrchestratorContext,
} from './PayrollAutomationOrchestratorContext';

export function usePayrollAutomationOrchestrator() {
  const context = useContext(
    PayrollAutomationOrchestratorContext
  );

  if (!context) {
    throw new Error(
      'usePayrollAutomationOrchestrator must be used inside ' +
      'PayrollAutomationOrchestratorProvider'
    );
  }

  return context;
}
