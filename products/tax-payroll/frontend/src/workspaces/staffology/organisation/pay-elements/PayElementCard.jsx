import PropTypes from 'prop-types';

import OrganisationField
  from '../OrganisationField';

export default function PayElementCard({
  element,
}) {
  return (
    <article className="organisation-collection-card pay-element-card">
      <h3>{element.title}</h3>

      <dl className="organisation-field-grid">
        {element.fields.map((field) => (
          <OrganisationField
            key={field.label}
            label={field.label}
            value={field.value}
          />
        ))}
      </dl>
    </article>
  );
}

PayElementCard.propTypes = {
  element: PropTypes.shape({
    title: PropTypes.string.isRequired,
    fields: PropTypes.array.isRequired,
  }).isRequired,
};
