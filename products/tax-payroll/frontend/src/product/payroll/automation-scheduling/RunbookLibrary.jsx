import PropTypes from 'prop-types';

export default function RunbookLibrary({ runbooks }) {
  return (
    <section className="runbook-library">
      <header>
        <h3>Operational runbooks</h3>
        <strong>{runbooks.length}</strong>
      </header>

      <div className="runbook-library__grid">
        {runbooks.map((runbook) => (
          <article key={runbook.id}>
            <strong>{runbook.title}</strong>
            <ol>
              {runbook.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </article>
        ))}
      </div>
    </section>
  );
}

RunbookLibrary.propTypes = {
  runbooks: PropTypes.arrayOf(PropTypes.object).isRequired,
};
