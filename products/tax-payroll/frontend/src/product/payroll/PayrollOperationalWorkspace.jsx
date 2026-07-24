import StaffologyPayrollRunWorkspace from
  '../../workspaces/staffology/payroll-run/StaffologyPayrollRunWorkspace';

import EmployerPayrollContext from './EmployerPayrollContext';
import PayrollRuntimeRequired from './PayrollRuntimeRequired';
import PayrollWorkflowRail from './PayrollWorkflowRail';
import PayrollWorkspaceHeader from './PayrollWorkspaceHeader';

import {
  PAYROLL_WORKFLOW_STAGES,
  getPayrollWorkflowSummary,
} from './payrollWorkflow';

import {
  usePayrollEmployerContext,
} from './context';

import './payroll-operational-workspace.css';
import './payroll-operational-layout.css';
import './payroll-operational-responsive.css';

export default function PayrollOperationalWorkspace() {
  const summary = getPayrollWorkflowSummary();
  const context = usePayrollEmployerContext();

  return (
    <section className="payroll-operational-workspace">
      <PayrollWorkspaceHeader summary={summary} />

      <EmployerPayrollContext context={context} />

      <PayrollWorkflowRail
        stages={PAYROLL_WORKFLOW_STAGES}
        activeId="employee-selection"
      />

      <div className="payroll-operational-workspace__content">
        {context.runtimeWorkspace ? (
          <StaffologyPayrollRunWorkspace
            runtimeWorkspace={context.runtimeWorkspace}
          />
        ) : (
          <PayrollRuntimeRequired />
        )}
      </div>
    </section>
  );
}
