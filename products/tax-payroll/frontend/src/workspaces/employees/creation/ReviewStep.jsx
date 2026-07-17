import PropTypes from 'prop-types';
import { WorkspaceCard } from '../../framework';
import { employeeDisplayName } from './employeeCreationModel';

export default function ReviewStep({ draft }) {
  return (
    <div className="workspace-card-grid">
      <WorkspaceCard
        label="Employee"
        value={employeeDisplayName(draft)}
      />
      <WorkspaceCard
        label="Payroll code"
        value={draft.employment.payrollCode}
      />
      <WorkspaceCard
        label="Start date"
        value={draft.employment.startDate}
      />
      <WorkspaceCard
        label="Pay frequency"
        value={draft.payroll.payFrequency}
      />
      <WorkspaceCard
        label="Tax code"
        value={draft.tax.taxCode}
      />
      <WorkspaceCard
        label="NI category"
        value={draft.nationalInsurance.category}
      />
      <WorkspaceCard
        label="Pension status"
        value={draft.pension.autoEnrolmentStatus}
      />
    </div>
  );
}

ReviewStep.propTypes = {
  draft: PropTypes.object.isRequired,
};
