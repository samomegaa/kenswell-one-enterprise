import PropTypes from 'prop-types';

export default function DiagnosticsSummaryCard({
  diagnostics,
}) {
  return (
    <aside className="diagnostics-summary-card">
      <header>
        <span>Runtime diagnostics</span>
        <strong>{diagnostics.status}</strong>
      </header>

      {diagnostics.issues.length === 0 ? (
        <p>No runtime issues detected.</p>
      ) : (
        <ul>
          {diagnostics.issues.map((issue) => (
            <li key={issue}>{issue}</li>
          ))}
        </ul>
      )}
    </aside>
  );
}

DiagnosticsSummaryCard.propTypes = {
  diagnostics: PropTypes.object.isRequired,
};
