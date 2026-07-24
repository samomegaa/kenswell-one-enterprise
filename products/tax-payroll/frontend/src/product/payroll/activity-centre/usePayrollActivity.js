import { useContext } from 'react';
import {
  PayrollActivityContext,
} from './PayrollActivityContext';

export function usePayrollActivity() {
  const context = useContext(PayrollActivityContext);

  if (!context) {
    throw new Error(
      'usePayrollActivity must be used inside PayrollActivityProvider'
    );
  }

  return context;
}
