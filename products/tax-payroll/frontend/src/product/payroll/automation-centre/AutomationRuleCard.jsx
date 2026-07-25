import PropTypes from 'prop-types';

export default function AutomationRuleCard({
  rule,
  playbook,
  onRun,
}) {
  return (
    <article className="automation-rule-card">
      <header>
        <div>
          <span>{rule.trigger}</span>
          <h3>{rule.label}</h3>
        </div>
        <strong>{rule.matched ? 'matched' : 'idle'}</strong>
      </header>

      <p>
        Command: <code>{rule.commandType}</code>
      </p>

      {playbook && (
        <ol>
          {playbook.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      )}

      <button
        type="button"
        disabled={!rule.matched}
        onClick={() => onRun(rule)}
      >
        Create governed command
      </button>
    </article>
  );
}

AutomationRuleCard.propTypes = {
  rule: PropTypes.object.isRequired,
  playbook: PropTypes.object,
  onRun: PropTypes.func.isRequired,
};
