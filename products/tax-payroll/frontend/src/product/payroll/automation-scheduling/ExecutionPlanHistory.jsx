import PropTypes from 'prop-types';

export default function ExecutionPlanHistory({ history }) {
  return (
    <section className="execution-plan-history">
      <header>
        <h3>Execution-plan history</h3>
        <strong>{history.length}</strong>
      </header>

      {history.length === 0 ? (
        <p>No execution plans recorded.</p>
      ) : (
        <ul>
          {history.map((plan) => (
            <li key={plan.id}>
              <span>{plan.runbookTitle}</span>
              <strong>{plan.source}</strong>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

ExecutionPlanHistory.propTypes = {
  history: PropTypes.arrayOf(PropTypes.object).isRequired,
};
