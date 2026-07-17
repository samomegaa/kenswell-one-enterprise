import PropTypes from 'prop-types';
import EmployeeField from './EmployeeField';

export default function EmploymentStep({ draft, errors, onChange }) {
  const employment = draft.employment;

  return (
    <div className="employee-creation-grid">
      <EmployeeField
        label="Payroll code"
        name="employment.payrollCode"
        value={employment.payrollCode}
        error={errors['employment.payrollCode']}
        onChange={onChange}
      />
      <EmployeeField
        label="Job title"
        name="employment.jobTitle"
        value={employment.jobTitle}
        onChange={onChange}
      />
      <EmployeeField
        label="Department"
        name="employment.department"
        value={employment.department}
        onChange={onChange}
      />
      <EmployeeField
        label="Start date"
        name="employment.startDate"
        value={employment.startDate}
        error={errors['employment.startDate']}
        type="date"
        onChange={onChange}
      />
      <EmployeeField
        label="Status"
        name="employment.status"
        value={employment.status}
        onChange={onChange}
        options={[
          { value: 'active', label: 'Active' },
          { value: 'draft', label: 'Draft' },
          { value: 'on_leave', label: 'On leave' },
        ]}
      />
      <label className="employee-creation-checkbox">
        <input
          name="employment.isDirector"
          type="checkbox"
          checked={employment.isDirector}
          onChange={onChange}
        />
        <span>Company director</span>
      </label>
    </div>
  );
}

EmploymentStep.propTypes = {
  draft: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};
