import PropTypes from 'prop-types';

import StaffologyPayrollRunWorkspace from
  '../../workspaces/staffology/payroll-run/StaffologyPayrollRunWorkspace';

import PayrollRuntimeRequired from './PayrollRuntimeRequired';
import PayrollWorkflowRail from './PayrollWorkflowRail';
import PayrollWorkspaceHeader from './PayrollWorkspaceHeader';

import {
  PAYROLL_WORKFLOW_STAGES,
  getPayrollWorkflowSummary,
} from './payrollWorkflow';

import './payroll-operational-workspace.css';
import './payroll-operational-layout.css';
import './payroll-operational-responsive.css';

export default function PayrollOperationalWorkspace({
  runtimeWorkspace,
}) {
  const summary = getPayrollWorkflowSummary();

  return (
    <section className="payroll-operational-workspace">
      <PayrollWorkspaceHeader summary={summary} />

      <PayrollWorkflowRail
        stages={PAYROLL_WORKFLOW_STAGES}
        activeId="employee-selection"
      />

      <div className="payroll-operational-workspace__content">
        {runtimeWorkspace ? (
          <StaffologyPayrollRunWorkspace
            runtimeWorkspace={runtimeWorkspace}
          />
        ) : (
          <PayrollRuntimeRequired />
        )}
      </div>
    </section>
  );
}

PayrollOperationalWorkspace.propTypes = {
  runtimeWorkspace: PropTypes.object,
};

PayrollOperationalWorkspace.defaultProps = {
  runtimeWorkspace: null,
};
