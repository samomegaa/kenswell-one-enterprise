import PropTypes from 'prop-types';
export default function OrganisationSummaryCard({ model }) {
  return <header className="organisation-summary-card"><div><p className="eyebrow">Staffology organisation</p><h1>{model.title}</h1><p>Employer reference {model.reference}</p></div><span className="organisation-read-only-badge">Read only</span></header>;
}
OrganisationSummaryCard.propTypes = { model: PropTypes.object.isRequired };
