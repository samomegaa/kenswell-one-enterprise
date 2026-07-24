import PropTypes from 'prop-types';

import StaffologyPayrollRunWorkspace from
  '../../workspaces/staffology/payroll-run/StaffologyPayrollRunWorkspace';

import EmployerPayrollContext from './EmployerPayrollContext';
import PayrollExecutionCard from './PayrollExecutionCard';
import PayrollPeriodCard from './PayrollPeriodCard';
import PayrollRuntimeCard from './PayrollRuntimeCard';
import PayrollRuntimeRequired from './PayrollRuntimeRequired';
import PayrollWorkflowRail from './PayrollWorkflowRail';
import PayrollWorkspaceHeader from './PayrollWorkspaceHeader';

import {
  PAYROLL_WORKFLOW_STAGES,
  getPayrollWorkflowSummary,
} from './payrollWorkflow';

import { usePayrollOrchestrator } from './orchestrator';
import { usePayrollPeriod } from './period';
import { usePayrollSession } from './session';

import './payroll-operational-workspace.css';
import './payroll-operational-layout.css';
import './payroll-operational-responsive.css';
import './payroll-runtime-card.css';
import './payroll-period-card.css';
import './payroll-execution-card.css';

export default function PayrollOperationalWorkspace({
  context,
}) {
  const summary = getPayrollWorkflowSummary();
  const sessionState = usePayrollSession();
  const periodState = usePayrollPeriod();
  const orchestrator = usePayrollOrchestrator();

  const operational =
    sessionState.active && periodState.active;

  return (
    <section className="payroll-operational-workspace">
      <PayrollWorkspaceHeader summary={summary} />
      <EmployerPayrollContext context={context} />

      <PayrollRuntimeCard
        session={sessionState.session}
        active={sessionState.active}
        onDeactivate={sessionState.deactivate}
      />

      <PayrollPeriodCard
        period={periodState.period}
        active={periodState.active}
        onClose={periodState.close}
      />

      <PayrollExecutionCard
        execution={orchestrator.execution}
        nextState={orchestrator.nextState}
        onAdvance={orchestrator.advance}
        onPause={orchestrator.pause}
        onResume={orchestrator.resume}
        onCancel={orchestrator.cancel}
      />

      <PayrollWorkflowRail
        stages={PAYROLL_WORKFLOW_STAGES}
        activeId={
          orchestrator.execution?.state ||
          periodState.stage
        }
      />

      <div className="payroll-operational-workspace__content">
        {operational &&
        sessionState.session?.runtimeWorkspace ? (
          <StaffologyPayrollRunWorkspace
            runtimeWorkspace={
              sessionState.session.runtimeWorkspace
            }
          />
        ) : (
          <PayrollRuntimeRequired />
        )}
      </div>
    </section>
  );
}

PayrollOperationalWorkspace.propTypes = {
  context: PropTypes.object.isRequired,
};
