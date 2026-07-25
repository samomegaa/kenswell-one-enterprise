import PropTypes from 'prop-types';

export default function SafeActionPanel({
  commands,
  onRequest,
}) {
  return (
    <section className="safe-action-panel">
      <h3>Available actions</h3>

      <div className="safe-action-panel__grid">
        {commands.map((command) => (
          <article key={command.id}>
            <strong>{command.label}</strong>
            <p>{command.eligibility.reason}</p>
            <button
              type="button"
              disabled={!command.eligibility.eligible}
              onClick={() => onRequest(command)}
            >
              Request action
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

SafeActionPanel.propTypes = {
  commands: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRequest: PropTypes.func.isRequired,
};
