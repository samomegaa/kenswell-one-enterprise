import { useContext } from 'react';

import {
  PayrollDecisionIntelligenceContext,
} from './PayrollDecisionIntelligenceContext';

export function usePayrollDecisionIntelligence() {
  const context = useContext(
    PayrollDecisionIntelligenceContext
  );

  if (!context) {
    throw new Error(
      'usePayrollDecisionIntelligence must be used inside ' +
      'PayrollDecisionIntelligenceProvider'
    );
  }

  return context;
}
