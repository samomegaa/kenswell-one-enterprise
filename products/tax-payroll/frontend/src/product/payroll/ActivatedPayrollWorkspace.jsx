import PropTypes from 'prop-types';
import PayrollOperationalWorkspace from './PayrollOperationalWorkspace';
import { usePayrollEmployerContext } from './context';
import { PayrollOrchestratorProvider, usePayrollOrchestrator } from './orchestrator';
import { PayrollPeriodProvider, usePayrollPeriod } from './period';
import { PayrollPipelineProvider } from './pipeline';
import { PayrollSessionProvider, usePayrollSession } from './session';

function PipelineWorkspace({ context }) {
  const { execution } = usePayrollOrchestrator();
  return <PayrollPipelineProvider execution={execution}><PayrollOperationalWorkspace context={context} /></PayrollPipelineProvider>;
}
function OrchestratedWorkspace({ context }) {
  const { period } = usePayrollPeriod();
  return <PayrollOrchestratorProvider period={period}><PipelineWorkspace context={context} /></PayrollOrchestratorProvider>;
}
function PeriodActivatedWorkspace({ context }) {
  const { session } = usePayrollSession();
  return <PayrollPeriodProvider session={session}><OrchestratedWorkspace context={context} /></PayrollPeriodProvider>;
}
export default function ActivatedPayrollWorkspace() {
  const context = usePayrollEmployerContext();
  return <PayrollSessionProvider runtimeWorkspace={context.runtimeWorkspace}><PeriodActivatedWorkspace context={context} /></PayrollSessionProvider>;
}
PipelineWorkspace.propTypes = { context: PropTypes.object.isRequired };
OrchestratedWorkspace.propTypes = { context: PropTypes.object.isRequired };
PeriodActivatedWorkspace.propTypes = { context: PropTypes.object.isRequired };
