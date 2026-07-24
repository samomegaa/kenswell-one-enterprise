import { useContext } from 'react';
import {
  PayrollSubmissionContext,
} from './PayrollSubmissionContext';

export function usePayrollSubmission() {
  const context = useContext(PayrollSubmissionContext);

  if (!context) {
    throw new Error(
      'usePayrollSubmission must be used inside ' +
      'PayrollSubmissionProvider'
    );
  }

  return context;
}
