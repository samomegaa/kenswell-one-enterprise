import PropTypes from 'prop-types';

import PayrollOperationalWorkspace from
  './PayrollOperationalWorkspace';

import {
  usePayrollEmployerContext,
} from './context';

import {
  PayrollGovernanceProvider,
} from './approval';

import {
  PayrollOrchestratorProvider,
  usePayrollOrchestrator,
} from './orchestrator';

import {
  PayrollPeriodProvider,
  usePayrollPeriod,
} from './period';

import {
  PayrollPipelineProvider,
  usePayrollPipeline,
} from './pipeline';

import {
  PayrollSessionProvider,
  usePayrollSession,
} from './session';

function GovernanceWorkspace({ context }) {
  const { pipeline } = usePayrollPipeline();

  return (
    <PayrollGovernanceProvider pipeline={pipeline}>
      <PayrollOperationalWorkspace context={context} />
    </PayrollGovernanceProvider>
  );
}

function PipelineWorkspace({ context }) {
  const { execution } = usePayrollOrchestrator();

  return (
    <PayrollPipelineProvider execution={execution}>
      <GovernanceWorkspace context={context} />
    </PayrollPipelineProvider>
  );
}

function OrchestratedWorkspace({ context }) {
  const { period } = usePayrollPeriod();

  return (
    <PayrollOrchestratorProvider period={period}>
      <PipelineWorkspace context={context} />
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

GovernanceWorkspace.propTypes =
PipelineWorkspace.propTypes =
OrchestratedWorkspace.propTypes =
PeriodActivatedWorkspace.propTypes = {
  context: PropTypes.object.isRequired,
};
