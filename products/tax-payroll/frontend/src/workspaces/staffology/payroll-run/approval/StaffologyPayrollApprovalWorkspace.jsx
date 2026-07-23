import { useMemo } from 'react';
import PropTypes from 'prop-types';

import StaffologyWorkspaceState from '../../StaffologyWorkspaceState';
import { adaptStaffologyPayrollApproval } from './adaptStaffologyPayrollApproval';
import { createPayrollApprovalPresentationModel } from './payrollApprovalPresentationModel';
import PayrollApprovalSummary from './PayrollApprovalSummary';
import PayrollApprovalReadiness from './PayrollApprovalReadiness';
import PayrollApprovalTimeline from './PayrollApprovalTimeline';
import './payroll-approval.css';
import './payroll-approval-responsive.css';

export default function StaffologyPayrollApprovalWorkspace({ employer, payrollRun }) {
  const model = useMemo(
    () => createPayrollApprovalPresentationModel(
      adaptStaffologyPayrollApproval(employer, payrollRun)
    ),
    [employer, payrollRun]
  );

  if (!model.available) {
    return (
      <StaffologyWorkspaceState
        title="Payroll approval unavailable"
        message="Approval workflow information is not present in the current Staffology payroll response."
      />
    );
  }

  return (
    <section className="payroll-approval-panel">
      <header className="payroll-approval-heading">
        <div>
          <p className="payroll-run-eyebrow">Payroll approval workspace</p>
          <h2>Approval readiness</h2>
          <p>Review approval state and operational gates supplied by the Staffology runtime.</p>
        </div>
        <span className="payroll-approval-read-only">Read only</span>
      </header>

      <PayrollApprovalSummary model={model} />

      <dl className="payroll-approval-metadata">
        <div><dt>Approved by</dt><dd>{model.approvedBy}</dd></div>
        <div><dt>Approved at</dt><dd>{model.approvedAt}</dd></div>
      </dl>

      <PayrollApprovalReadiness blockers={model.blockers} requirements={model.requirements} />
      <PayrollApprovalTimeline history={model.history} />

      <p className="payroll-approval-note">
        This workspace cannot approve, reject, reopen, or submit payroll.
      </p>
    </section>
  );
}

StaffologyPayrollApprovalWorkspace.propTypes = {
  employer: PropTypes.object.isRequired,
  payrollRun: PropTypes.object,
};
