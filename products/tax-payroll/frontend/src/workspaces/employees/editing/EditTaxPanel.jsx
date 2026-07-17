import PropTypes from 'prop-types';
import EmployeeEditField from './EmployeeEditField';

export default function EditTaxPanel({ employee, errors, onChange }) {
  const tax = employee.tax || {};
  const ni = employee.nationalInsurance || {};

  return (
    <div className="employee-edit-grid">
      <EmployeeEditField
        label="Tax code"
        name="tax.taxCode"
        value={tax.taxCode}
        error={errors['tax.taxCode']}
        onChange={onChange}
      />
      <EmployeeEditField
        label="Tax basis"
        name="tax.taxBasis"
        value={tax.taxBasis}
        onChange={onChange}
        options={[
          { value: 'cumulative', label: 'Cumulative' },
          { value: 'week1_month1', label: 'Week 1 / Month 1' },
        ]}
      />
      <EmployeeEditField
        label="NI number"
        name="nationalInsurance.number"
        value={ni.number}
        onChange={onChange}
      />
      <EmployeeEditField
        label="NI category"
        name="nationalInsurance.category"
        value={ni.category}
        error={errors['nationalInsurance.category']}
        onChange={onChange}
        options={['A', 'B', 'C', 'H', 'J', 'M', 'V', 'Z'].map((value) => ({
          value,
          label: `Category ${value}`,
        }))}
      />
    </div>
  );
}

EditTaxPanel.propTypes = {
  employee: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};
