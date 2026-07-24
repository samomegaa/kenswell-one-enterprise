import PropTypes from 'prop-types';

import PayrollOperationalWorkspace from
  './PayrollOperationalWorkspace';

import {
  usePayrollEmployerContext,
} from './context';

import {
  PayrollGovernanceProvider,
  usePayrollGovernance,
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

import {
  PayrollSubmissionProvider,
} from './submission';

function SubmissionWorkspace({ context }) {
  const governance = usePayrollGovernance();
  const { pipeline } = usePayrollPipeline();
  const { period } = usePayrollPeriod();

  return (
    <PayrollSubmissionProvider
      pipeline={pipeline}
      approval={governance.approval}
      compliance={governance.compliance}
      employer={context.runtimeWorkspace}
      period={period}
    >
      <PayrollOperationalWorkspace context={context} />
    </PayrollSubmissionProvider>
  );
}

function GovernanceWorkspace({ context }) {
  const { pipeline } = usePayrollPipeline();

  return (
    <PayrollGovernanceProvider pipeline={pipeline}>
      <SubmissionWorkspace context={context} />
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

SubmissionWorkspace.propTypes =
GovernanceWorkspace.propTypes =
PipelineWorkspace.propTypes =
OrchestratedWorkspace.propTypes =
PeriodActivatedWorkspace.propTypes = {
  context: PropTypes.object.isRequired,
};
