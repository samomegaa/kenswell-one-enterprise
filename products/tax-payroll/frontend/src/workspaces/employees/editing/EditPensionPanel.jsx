import PropTypes from 'prop-types';
import EmployeeEditField from './EmployeeEditField';

export default function EditPensionPanel({ employee, onChange }) {
  const pension = employee.pension || {};

  return (
    <div className="employee-edit-grid">
      <EmployeeEditField
        label="Auto-enrolment status"
        name="pension.autoEnrolmentStatus"
        value={pension.autoEnrolmentStatus}
        onChange={onChange}
        options={[
          { value: 'not_assessed', label: 'Not assessed' },
          { value: 'eligible', label: 'Eligible jobholder' },
          { value: 'non_eligible', label: 'Non-eligible jobholder' },
          { value: 'entitled', label: 'Entitled worker' },
          { value: 'enrolled', label: 'Enrolled' },
          { value: 'opted_out', label: 'Opted out' },
        ]}
      />
      <EmployeeEditField
        label="Scheme ID"
        name="pension.schemeId"
        value={pension.schemeId}
        onChange={onChange}
      />
      <EmployeeEditField
        label="Employee contribution %"
        name="pension.employeeContribution"
        value={pension.employeeContribution}
        type="number"
        min="0"
        step="0.01"
        onChange={onChange}
      />
      <EmployeeEditField
        label="Employer contribution %"
        name="pension.employerContribution"
        value={pension.employerContribution}
        type="number"
        min="0"
        step="0.01"
        onChange={onChange}
      />
    </div>
  );
}

EditPensionPanel.propTypes = {
  employee: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};
