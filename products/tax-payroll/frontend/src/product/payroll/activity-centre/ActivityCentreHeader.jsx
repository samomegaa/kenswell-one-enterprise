import PropTypes from 'prop-types';

export default function ActivityCentreHeader({
  summary,
  diagnostics,
}) {
  return (
    <header className="activity-centre-header">
      <div>
        <span>Enterprise activity</span>
        <h2>Operational Timeline</h2>
      </div>

      <div className="activity-centre-header__status">
        <strong>{diagnostics.status}</strong>
        <small>{summary.total} events</small>
      </div>
    </header>
  );
}

ActivityCentreHeader.propTypes = {
  summary: PropTypes.object.isRequired,
  diagnostics: PropTypes.object.isRequired,
};
