import PropTypes from 'prop-types';

export default function PolicyEvaluationPanel({ decision }) {
  const policies =
    decision?.policyRuntime?.matched || [];

  return (
    <section className="policy-evaluation-panel">
      <header>
        <h3>Policies evaluated</h3>
        <strong>{policies.length}</strong>
      </header>

      {policies.length === 0 ? (
        <p>No adaptive policy matched.</p>
      ) : (
        policies.map((policy) => (
          <article key={policy.id}>
            <strong>{policy.label}</strong>
            <span>{policy.outcome}</span>
          </article>
        ))
      )}
    </section>
  );
}

PolicyEvaluationPanel.propTypes = {
  decision: PropTypes.object,
};
