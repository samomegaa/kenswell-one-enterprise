import PropTypes from 'prop-types';

export default function RunbookLaunchGrid({
  runbooks,
  onLaunch,
}) {
  return (
    <section className="orchestrator-runbooks">
      <header>
        <h3>Orchestration-ready runbooks</h3>
        <strong>{runbooks.length}</strong>
      </header>

      <div>
        {runbooks.map((runbook) => (
          <article key={runbook.id}>
            <strong>{runbook.title}</strong>
            <span>{runbook.steps.length} coordinated steps</span>
            <button
              type="button"
              onClick={() => onLaunch(runbook)}
            >
              Create orchestration
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

RunbookLaunchGrid.propTypes = {
  runbooks: PropTypes.arrayOf(PropTypes.object).isRequired,
  onLaunch: PropTypes.func.isRequired,
};
