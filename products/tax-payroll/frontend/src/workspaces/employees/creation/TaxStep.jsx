import PropTypes from 'prop-types';
import EmployeeField from './EmployeeField';

export default function TaxStep({ draft, errors, onChange }) {
  return (
    <div className="employee-creation-grid">
      <EmployeeField
        label="Tax code"
        name="tax.taxCode"
        value={draft.tax.taxCode}
        error={errors['tax.taxCode']}
        onChange={onChange}
      />
      <EmployeeField
        label="Tax basis"
        name="tax.taxBasis"
        value={draft.tax.taxBasis}
        onChange={onChange}
        options={[
          { value: 'cumulative', label: 'Cumulative' },
          { value: 'week1_month1', label: 'Week 1 / Month 1' },
        ]}
      />
      <EmployeeField
        label="Starter declaration"
        name="tax.starterDeclaration"
        value={draft.tax.starterDeclaration}
        onChange={onChange}
        options={[
          { value: '', label: 'Not supplied' },
          { value: 'A', label: 'Statement A' },
          { value: 'B', label: 'Statement B' },
          { value: 'C', label: 'Statement C' },
        ]}
      />
      <EmployeeField
        label="National Insurance number"
        name="nationalInsurance.number"
        value={draft.nationalInsurance.number}
        onChange={onChange}
      />
      <EmployeeField
        label="NI category"
        name="nationalInsurance.category"
        value={draft.nationalInsurance.category}
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

TaxStep.propTypes = {
  draft: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};
