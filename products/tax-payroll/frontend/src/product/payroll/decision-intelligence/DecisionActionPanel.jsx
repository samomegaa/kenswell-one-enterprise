import PropTypes from 'prop-types';

export default function DecisionActionPanel({
  decision,
  onEvaluate,
  onRequest,
}) {
  return (
    <section className="decision-action-panel">
      <button type="button" onClick={onEvaluate}>
        Evaluate enterprise state
      </button>

      <button
        type="button"
        disabled={!decision || decision.status === 'blocked'}
        onClick={() => onRequest(decision)}
      >
        Request governed strategy
      </button>
    </section>
  );
}

DecisionActionPanel.propTypes = {
  decision: PropTypes.object,
  onEvaluate: PropTypes.func.isRequired,
  onRequest: PropTypes.func.isRequired,
};
