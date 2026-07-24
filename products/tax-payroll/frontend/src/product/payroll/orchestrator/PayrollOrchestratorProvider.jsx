import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import PropTypes from 'prop-types';

import { PAYROLL_STATE_EVENTS } from '../state';
import {
  PayrollOrchestratorContext,
} from './PayrollOrchestratorContext';
import {
  advancePayrollExecution,
} from './advancePayrollExecution';
import {
  publishPayrollEvent,
  writePayrollAudit,
} from './payrollEnterpriseAdapter';
import {
  readPayrollExecution,
  writePayrollExecution,
} from './payrollExecutionStorage';
import {
  restorePayrollExecution,
} from './restorePayrollExecution';

export function PayrollOrchestratorProvider({
  period,
  enterpriseAdapter,
  children,
}) {
  const [execution, setExecution] = useState(null);

  useEffect(() => {
    const next = restorePayrollExecution(
      readPayrollExecution(),
      period
    );

    setExecution(next);
    writePayrollExecution(next);
  }, [period]);

  const commit = useCallback((next, eventName) => {
    setExecution(next);
    writePayrollExecution(next);
    publishPayrollEvent(enterpriseAdapter, eventName, next);
    writePayrollAudit(enterpriseAdapter, eventName, next);
  }, [enterpriseAdapter]);

  const advance = useCallback(() => {
    commit(
      advancePayrollExecution(execution),
      PAYROLL_STATE_EVENTS.STAGE_COMPLETED
    );
  }, [execution, commit]);

  const pause = useCallback(() => {
    commit(
      execution && { ...execution, status: 'paused' },
      PAYROLL_STATE_EVENTS.EXECUTION_PAUSED
    );
  }, [execution, commit]);

  const resume = useCallback(() => {
    commit(
      execution && { ...execution, status: 'running' },
      PAYROLL_STATE_EVENTS.EXECUTION_RESUMED
    );
  }, [execution, commit]);

  const cancel = useCallback(() => {
    commit(
      execution && { ...execution, status: 'cancelled' },
      PAYROLL_STATE_EVENTS.EXECUTION_CANCELLED
    );
  }, [execution, commit]);

  const value = useMemo(() => ({
    execution,
    nextState: getNextState(execution?.state),
    advance,
    pause,
    resume,
    cancel,
  }), [execution, advance, pause, resume, cancel]);

  return (
    <PayrollOrchestratorContext.Provider value={value}>
      {children}
    </PayrollOrchestratorContext.Provider>
  );
}

function getNextState(state) {
  const order = [
    'employee-selection',
    'calculation',
    'validation',
    'approval',
    'fps-preparation',
    'submitted',
    'closed',
  ];

  const index = order.indexOf(state);
  return index >= 0 ? order[index + 1] || null : null;
}

PayrollOrchestratorProvider.propTypes = {
  period: PropTypes.object,
  enterpriseAdapter: PropTypes.shape({
    publishEvent: PropTypes.func,
    writeAudit: PropTypes.func,
  }),
  children: PropTypes.node.isRequired,
};
