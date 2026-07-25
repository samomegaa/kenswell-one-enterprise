import PropTypes from 'prop-types';

export default function AutomationHistoryCard({ history }) {
  return (
    <section className="automation-history-card">
      <header>
        <h3>Automation history</h3>
        <strong>{history.length}</strong>
      </header>

      {history.length === 0 ? (
        <p>No automation runs recorded.</p>
      ) : (
        <ul>
          {history.map((run) => (
            <li key={run.id}>
              <span>{run.ruleLabel}</span>
              <strong>{run.status}</strong>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

AutomationHistoryCard.propTypes = {
  history: PropTypes.arrayOf(PropTypes.object).isRequired,
};
