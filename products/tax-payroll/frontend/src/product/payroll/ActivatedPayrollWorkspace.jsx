import PropTypes from 'prop-types';

import PayrollOperationalWorkspace from
  './PayrollOperationalWorkspace';
import {
  usePayrollEmployerContext,
} from './context';
import {
  PayrollOrchestratorProvider,
} from './orchestrator';
import {
  PayrollPeriodProvider,
  usePayrollPeriod,
} from './period';
import {
  PayrollSessionProvider,
  usePayrollSession,
} from './session';

function OrchestratedWorkspace({ context }) {
  const { period } = usePayrollPeriod();

  return (
    <PayrollOrchestratorProvider period={period}>
      <PayrollOperationalWorkspace context={context} />
    </PayrollOrchestratorProvider>
  );
}

function PeriodActivatedWorkspace({ context }) {
  const { session } = usePayrollSession();

  return (
    <PayrollPeriodProvider session={session}>
      <OrchestratedWorkspace context={context} />
    </PayrollPeriodProvider>
  );
}

export default function ActivatedPayrollWorkspace() {
  const context = usePayrollEmployerContext();

  return (
    <PayrollSessionProvider
      runtimeWorkspace={context.runtimeWorkspace}
    >
      <PeriodActivatedWorkspace context={context} />
    </PayrollSessionProvider>
  );
}

OrchestratedWorkspace.propTypes = {
  context: PropTypes.object.isRequired,
};

PeriodActivatedWorkspace.propTypes = {
  context: PropTypes.object.isRequired,
};
