import PropTypes from 'prop-types';

export default function EventWorkflowCard({
  workflows,
  onEvent,
}) {
  return (
    <section className="event-workflow-card">
      <header>
        <h3>Event-driven workflows</h3>
        <strong>{workflows.length}</strong>
      </header>

      {workflows.map((workflow) => (
        <article key={workflow.id}>
          <div>
            <strong>{workflow.eventName}</strong>
            <span>{workflow.commandType}</span>
          </div>

          <button
            type="button"
            onClick={() => onEvent(workflow.eventName)}
          >
            Simulate event
          </button>
        </article>
      ))}
    </section>
  );
}

EventWorkflowCard.propTypes = {
  workflows: PropTypes.arrayOf(PropTypes.object).isRequired,
  onEvent: PropTypes.func.isRequired,
};
