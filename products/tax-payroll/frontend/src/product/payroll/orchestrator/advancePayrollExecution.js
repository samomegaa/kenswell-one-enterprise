import {
  getNextPayrollState,
  transitionPayrollState,
} from '../state';

export function advancePayrollExecution(execution) {
  if (!execution || execution.status === 'cancelled') {
    return execution;
  }

  const nextState = getNextPayrollState(execution.state);

  if (!nextState) {
    return Object.freeze({
      ...execution,
      status: 'completed',
    });
  }

  const transition = transitionPayrollState(
    execution.state,
    nextState
  );

  return Object.freeze({
    ...execution,
    state: transition.state,
    status:
      transition.state === 'closed'
        ? 'completed'
        : 'running',
    lastTransitionAt: transition.transitionedAt,
  });
}
