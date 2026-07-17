import PropTypes from 'prop-types';
import EmployeeField from './EmployeeField';

export default function PensionStep({ draft, errors, onChange }) {
  const pension = draft.pension;

  return (
    <div className="employee-creation-grid">
      <EmployeeField
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
      <EmployeeField
        label="Pension scheme ID"
        name="pension.schemeId"
        value={pension.schemeId}
        onChange={onChange}
      />
      <EmployeeField
        label="Employee contribution %"
        name="pension.employeeContribution"
        value={pension.employeeContribution}
        type="number"
        min="0"
        step="0.01"
        onChange={onChange}
      />
      <EmployeeField
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

PensionStep.propTypes = {
  draft: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};
