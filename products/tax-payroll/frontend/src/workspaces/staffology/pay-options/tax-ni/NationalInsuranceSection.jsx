import PropTypes from 'prop-types';
import StaffologyField from '../../StaffologyField';

export default function NationalInsuranceSection({ model }) {
  return (
    <section className="tax-ni-section">
      <h3>National Insurance</h3>
      <dl className="staffology-field-grid">
        <StaffologyField label="NI category" value={model.niCategory} />
        <StaffologyField label="NI number" value={model.niNumber} />
        <StaffologyField label="Director" value={model.director} />
        <StaffologyField label="Alternative NI method" value={model.alternativeNiMethod} />
        <StaffologyField label="Defer National Insurance" value={model.deferNationalInsurance} />
      </dl>
    </section>
  );
}

NationalInsuranceSection.propTypes = { model: PropTypes.object.isRequired };
