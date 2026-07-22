import PropTypes from 'prop-types';
import OrganisationField from '../OrganisationField';

export default function CostCentreCard({ costCentre }) {
  return (
    <article className="organisation-collection-card">
      <h3>{costCentre.title}</h3>
      <dl className="organisation-field-grid">
        {costCentre.fields.map((field) => (
          <OrganisationField key={field.label} label={field.label} value={field.value} />
        ))}
      </dl>
    </article>
  );
}

CostCentreCard.propTypes = { costCentre: PropTypes.shape({ title: PropTypes.string.isRequired, fields: PropTypes.array.isRequired }).isRequired };
