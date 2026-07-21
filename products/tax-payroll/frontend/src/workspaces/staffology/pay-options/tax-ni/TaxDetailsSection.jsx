import PropTypes from 'prop-types';
import StaffologyField from '../../StaffologyField';

export default function TaxDetailsSection({ model }) {
  return (
    <section className="tax-ni-section">
      <h3>Income Tax</h3>
      <dl className="staffology-field-grid">
        <StaffologyField label="Tax code" value={model.taxCode} />
        <StaffologyField label="Tax basis" value={model.taxBasis} />
        <StaffologyField label="Tax regime" value={model.taxRegime} />
        <StaffologyField label="Starter declaration" value={model.starterDeclaration} />
        <StaffologyField label="Previous taxable pay" value={model.previousTaxablePay} />
        <StaffologyField label="Previous tax paid" value={model.previousTaxPaid} />
      </dl>
    </section>
  );
}

TaxDetailsSection.propTypes = { model: PropTypes.object.isRequired };
