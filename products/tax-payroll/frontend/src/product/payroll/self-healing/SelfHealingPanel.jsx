import PropTypes from 'prop-types';

export default function SelfHealingPanel({
  plan,
  onEvaluate,
  onRequest,
}) {
  return (
    <section className="self-healing-panel">
      <header>
        <h3>Self-healing runtime</h3>
        <strong>{plan?.status || 'Ready'}</strong>
      </header>

      <p>
        {plan
          ? `${plan.strategy} recovery plan prepared`
          : 'No recovery plan currently required.'}
      </p>

      <div>
        <button type="button" onClick={onEvaluate}>
          Evaluate recovery
        </button>
        <button
          type="button"
          disabled={!plan || plan.status === 'blocked'}
          onClick={() => onRequest(plan)}
        >
          Request governed recovery
        </button>
      </div>
    </section>
  );
}

SelfHealingPanel.propTypes = {
  plan: PropTypes.object,
  onEvaluate: PropTypes.func.isRequired,
  onRequest: PropTypes.func.isRequired,
};
