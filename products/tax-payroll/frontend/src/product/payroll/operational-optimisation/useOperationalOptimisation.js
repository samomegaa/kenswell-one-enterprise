import { useContext } from 'react';
import {
  OperationalOptimisationContext,
} from './OperationalOptimisationContext';

export function useOperationalOptimisation() {
  const context = useContext(OperationalOptimisationContext);
  if (!context) {
    throw new Error(
      'useOperationalOptimisation must be used inside ' +
      'OperationalOptimisationProvider'
    );
  }
  return context;
}
