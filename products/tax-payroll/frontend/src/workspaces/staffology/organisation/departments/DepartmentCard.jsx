import PropTypes from 'prop-types';
import OrganisationField from '../OrganisationField';

export default function DepartmentCard({ department }) {
  return (
    <article className="organisation-collection-card">
      <h3>{department.title}</h3>
      <dl className="organisation-field-grid">
        {department.fields.map((field) => (
          <OrganisationField key={field.label} label={field.label} value={field.value} />
        ))}
      </dl>
    </article>
  );
}

DepartmentCard.propTypes = { department: PropTypes.shape({ title: PropTypes.string.isRequired, fields: PropTypes.array.isRequired }).isRequired };
