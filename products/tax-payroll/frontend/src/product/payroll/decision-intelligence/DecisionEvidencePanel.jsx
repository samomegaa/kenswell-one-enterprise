import PropTypes from 'prop-types';

export default function DecisionEvidencePanel({ decision }) {
  const signals = decision?.evidence?.signals || [];

  return (
    <section className="decision-evidence-panel">
      <header>
        <h3>Decision evidence</h3>
        <strong>{signals.length}</strong>
      </header>

      {signals.length === 0 ? (
        <p>No active operational signals.</p>
      ) : (
        <ul>
          {signals.map((signal) => (
            <li key={signal}>{signal}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

DecisionEvidencePanel.propTypes = {
  decision: PropTypes.object,
};
