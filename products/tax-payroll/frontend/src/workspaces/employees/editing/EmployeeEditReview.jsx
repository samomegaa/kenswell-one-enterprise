import PropTypes from 'prop-types';
import { WorkspaceCard } from '../../framework';
import { editingTitle } from './employeeEditingModel';

export default function EmployeeEditReview({ employee }) {
  return (
    <div className="workspace-card-grid">
      <WorkspaceCard label="Employee" value={editingTitle(employee)} />
      <WorkspaceCard
        label="Payroll code"
        value={employee.employment?.payrollCode}
      />
      <WorkspaceCard
        label="Status"
        value={employee.employment?.status}
      />
      <WorkspaceCard
        label="Department"
        value={employee.employment?.department}
      />
      <WorkspaceCard
        label="Pay frequency"
        value={employee.payroll?.payFrequency}
      />
      <WorkspaceCard
        label="Tax code"
        value={employee.tax?.taxCode}
      />
      <WorkspaceCard
        label="NI category"
        value={employee.nationalInsurance?.category}
      />
      <WorkspaceCard
        label="Expected version"
        value={`v${employee.version}`}
      />
    </div>
  );
}

EmployeeEditReview.propTypes = {
  employee: PropTypes.object.isRequired,
};
