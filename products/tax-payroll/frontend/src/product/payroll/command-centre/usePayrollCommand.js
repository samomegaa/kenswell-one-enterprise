import { useContext } from 'react';
import {
  PayrollCommandContext,
} from './PayrollCommandContext';

export function usePayrollCommand() {
  const context = useContext(PayrollCommandContext);

  if (!context) {
    throw new Error(
      'usePayrollCommand must be used inside PayrollCommandProvider'
    );
  }

  return context;
}
