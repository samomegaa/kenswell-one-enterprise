import PropTypes from 'prop-types';

export default function DecisionHistoryPanel({ history }) {
  return (
    <section className="decision-history-panel">
      <header>
        <h3>Decision history</h3>
        <strong>{history.length}</strong>
      </header>

      {history.length === 0 ? (
        <p>No decisions recorded.</p>
      ) : (
        <ul>
          {history.map((decision) => (
            <li key={decision.id}>
              <span>{decision.strategy}</span>
              <strong>{decision.confidence}%</strong>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

DecisionHistoryPanel.propTypes = {
  history: PropTypes.arrayOf(PropTypes.object).isRequired,
};
