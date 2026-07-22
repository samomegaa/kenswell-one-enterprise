import PropTypes from 'prop-types';
import OrganisationField from './OrganisationField';
export default function OrganisationDetailsSection({ title, fields }) {
  return <section className="organisation-details-section"><h2>{title}</h2><dl className="organisation-field-grid">{fields.map((field) => <OrganisationField key={field.label} {...field} />)}</dl></section>;
}
OrganisationDetailsSection.propTypes = { title: PropTypes.string.isRequired, fields: PropTypes.array.isRequired };
