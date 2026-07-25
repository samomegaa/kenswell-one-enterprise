import PropTypes from 'prop-types';

import AutomationRuleCard from './AutomationRuleCard';

export default function AutomationRuleGrid({
  rules,
  resolvePlaybook,
  onRun,
}) {
  return (
    <section className="automation-rule-grid">
      {rules.map((rule) => (
        <AutomationRuleCard
          key={rule.id}
          rule={rule}
          playbook={resolvePlaybook(rule.id)}
          onRun={onRun}
        />
      ))}
    </section>
  );
}

AutomationRuleGrid.propTypes = {
  rules: PropTypes.arrayOf(PropTypes.object).isRequired,
  resolvePlaybook: PropTypes.func.isRequired,
  onRun: PropTypes.func.isRequired,
};
