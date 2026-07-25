import { useContext } from 'react';
import { SelfHealingContext } from './SelfHealingContext';

export function useSelfHealing() {
  const context = useContext(SelfHealingContext);
  if (!context) {
    throw new Error(
      'useSelfHealing must be used inside SelfHealingProvider'
    );
  }
  return context;
}
