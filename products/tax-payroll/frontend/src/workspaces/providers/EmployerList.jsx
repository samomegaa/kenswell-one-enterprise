export default function EmployerList({ employers, onLink }) {
  if (!employers.length) {
    return (
      <section className="provider-empty-state">
        No employers were returned by Staffology.
      </section>
    );
  }

  return (
    <div className="provider-employer-list">
      {employers.map((employer) => (
        <article
          className="provider-employer-row"
          key={employer.externalEmployerId}
        >
          <div className="provider-employer-mark">
            {employer.name.slice(0, 1).toUpperCase()}
          </div>

          <div className="provider-employer-copy">
            <strong>{employer.name}</strong>
            <span>{employer.externalEmployerId}</span>
          </div>

          <div className="provider-employer-year">
            <span>Tax year</span>
            <strong>
              {employer.currentTaxYear ||
                employer.startTaxYear ||
                'Not supplied'}
            </strong>
          </div>

          <button
            type="button"
            className="provider-employer-action"
            onClick={() => onLink(employer)}
          >
            Link to client
          </button>
        </article>
      ))}
    </div>
  );
}
