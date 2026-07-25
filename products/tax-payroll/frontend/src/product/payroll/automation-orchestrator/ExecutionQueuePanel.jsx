import PropTypes from 'prop-types';

export default function ExecutionQueuePanel({
  executions,
  onRequest,
}) {
  return (
    <section className="execution-queue-panel">
      <header>
        <h3>Execution queue</h3>
        <strong>{executions.length}</strong>
      </header>

      {executions.length === 0 ? (
        <p>No orchestrations have been created.</p>
      ) : (
        executions.map((execution) => (
          <article key={execution.id}>
            <div>
              <strong>{execution.plan.title}</strong>
              <span>{execution.status}</span>
            </div>
            <button
              type="button"
              disabled={!execution.queue[0]?.commandType}
              onClick={() => onRequest(execution)}
            >
              Request next command
            </button>
          </article>
        ))
      )}
    </section>
  );
}

ExecutionQueuePanel.propTypes = {
  executions: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRequest: PropTypes.func.isRequired,
};
