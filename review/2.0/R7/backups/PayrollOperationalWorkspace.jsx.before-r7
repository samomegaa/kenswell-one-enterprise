import PropTypes from 'prop-types';

import StaffologyPayrollRunWorkspace from
  '../../workspaces/staffology/payroll-run/StaffologyPayrollRunWorkspace';

import EmployerPayrollContext from './EmployerPayrollContext';
import PayrollRuntimeCard from './PayrollRuntimeCard';
import PayrollRuntimeRequired from './PayrollRuntimeRequired';
import PayrollWorkflowRail from './PayrollWorkflowRail';
import PayrollWorkspaceHeader from './PayrollWorkspaceHeader';

import {
  PAYROLL_WORKFLOW_STAGES,
  getPayrollWorkflowSummary,
} from './payrollWorkflow';

import { usePayrollSession } from './session';

import './payroll-operational-workspace.css';
import './payroll-operational-layout.css';
import './payroll-operational-responsive.css';
import './payroll-runtime-card.css';

export default function PayrollOperationalWorkspace({
  context,
}) {
  const summary = getPayrollWorkflowSummary();
  const {
    session,
    active,
    deactivate,
  } = usePayrollSession();

  return (
    <section className="payroll-operational-workspace">
      <PayrollWorkspaceHeader summary={summary} />

      <EmployerPayrollContext context={context} />

      <PayrollRuntimeCard
        session={session}
        active={active}
        onDeactivate={deactivate}
      />

      <PayrollWorkflowRail
        stages={PAYROLL_WORKFLOW_STAGES}
        activeId="employee-selection"
      />

      <div className="payroll-operational-workspace__content">
        {active && session?.runtimeWorkspace ? (
          <StaffologyPayrollRunWorkspace
            runtimeWorkspace={session.runtimeWorkspace}
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
