import { PAYROLL_TRANSITIONS } from './payrollStateTransitions';

export function canTransitionPayroll(currentState, nextState) {
  return PAYROLL_TRANSITIONS[currentState] === nextState;
}

export function assertPayrollTransition(currentState, nextState) {
  if (!canTransitionPayroll(currentState, nextState)) {
    throw new Error(
      `Invalid payroll transition: ${currentState} -> ${nextState}`
    );
  }
}
