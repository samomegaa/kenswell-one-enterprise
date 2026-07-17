import PropTypes from 'prop-types';
import EmployeeEditField from './EmployeeEditField';

export default function EditEmploymentPanel({
  employee,
  errors,
  onChange,
}) {
  const employment = employee.employment || {};

  return (
    <div className="employee-edit-grid">
      <EmployeeEditField
        label="Payroll code"
        name="employment.payrollCode"
        value={employment.payrollCode}
        error={errors['employment.payrollCode']}
        onChange={onChange}
      />
      <EmployeeEditField
        label="Job title"
        name="employment.jobTitle"
        value={employment.jobTitle}
        onChange={onChange}
      />
      <EmployeeEditField
        label="Department"
        name="employment.department"
        value={employment.department}
        onChange={onChange}
      />
      <EmployeeEditField
        label="Start date"
        name="employment.startDate"
        value={employment.startDate}
        error={errors['employment.startDate']}
        type="date"
        onChange={onChange}
      />
      <EmployeeEditField
        label="Leaving date"
        name="employment.leavingDate"
        value={employment.leavingDate}
        type="date"
        onChange={onChange}
      />
      <EmployeeEditField
        label="Status"
        name="employment.status"
        value={employment.status}
        onChange={onChange}
        options={[
          { value: 'active', label: 'Active' },
          { value: 'suspended', label: 'Suspended' },
          { value: 'left', label: 'Left' },
        ]}
      />
    </div>
  );
}

EditEmploymentPanel.propTypes = {
  employee: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};
