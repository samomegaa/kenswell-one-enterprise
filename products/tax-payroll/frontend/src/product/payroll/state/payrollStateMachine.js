import { assertPayrollTransition } from './payrollStateGuard';
import { PAYROLL_TRANSITIONS } from './payrollStateTransitions';

export function getNextPayrollState(currentState) {
  return PAYROLL_TRANSITIONS[currentState] || null;
}

export function transitionPayrollState(currentState, nextState) {
  assertPayrollTransition(currentState, nextState);

  return Object.freeze({
    previousState: currentState,
    state: nextState,
    transitionedAt: new Date().toISOString(),
  });
}
