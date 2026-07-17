import PropTypes from 'prop-types';
import EmployeeEditField from './EmployeeEditField';

export default function EditPayrollPanel({ employee, errors, onChange }) {
  const payroll = employee.payroll || {};

  return (
    <div className="employee-edit-grid">
      <EmployeeEditField
        label="Pay frequency"
        name="payroll.payFrequency"
        value={payroll.payFrequency}
        error={errors['payroll.payFrequency']}
        onChange={onChange}
        options={[
          { value: 'weekly', label: 'Weekly' },
          { value: 'fortnightly', label: 'Fortnightly' },
          { value: 'four_weekly', label: 'Four-weekly' },
          { value: 'monthly', label: 'Monthly' },
        ]}
      />
      <EmployeeEditField
        label="Annual salary"
        name="payroll.salary"
        value={payroll.salary}
        type="number"
        min="0"
        step="0.01"
        onChange={onChange}
      />
      <EmployeeEditField
        label="Hourly rate"
        name="payroll.hourlyRate"
        value={payroll.hourlyRate}
        type="number"
        min="0"
        step="0.01"
        onChange={onChange}
      />
      <EmployeeEditField
        label="Normal weekly hours"
        name="payroll.normalHours"
        value={payroll.normalHours}
        type="number"
        min="0"
        step="0.25"
        onChange={onChange}
      />
      <EmployeeEditField
        label="Payment method"
        name="payroll.paymentMethod"
        value={payroll.paymentMethod}
        onChange={onChange}
        options={[
          { value: 'bacs', label: 'BACS' },
          { value: 'cash', label: 'Cash' },
          { value: 'cheque', label: 'Cheque' },
        ]}
      />
    </div>
  );
}

EditPayrollPanel.propTypes = {
  employee: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};
