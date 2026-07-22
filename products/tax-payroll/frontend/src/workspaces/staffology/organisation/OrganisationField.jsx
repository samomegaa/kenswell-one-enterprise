import PropTypes from 'prop-types';
export default function OrganisationField({ label, value }) {
  return <div className="organisation-field"><dt>{label}</dt><dd>{value}</dd></div>;
}
OrganisationField.propTypes = { label: PropTypes.string.isRequired, value: PropTypes.string.isRequired };
