import PropTypes from 'prop-types';

export default function AutomationMetricGrid({ metrics }) {
  const items = [
    ['Enabled rules', metrics.enabledRules],
    ['Matched rules', metrics.matchedRules],
    ['Commands created', metrics.commandsCreated],
    ['SLA breaches', metrics.slaBreaches],
  ];

  return (
    <div className="automation-metric-grid">
      {items.map(([label, value]) => (
        <article key={label}>
          <span>{label}</span>
          <strong>{value}</strong>
        </article>
      ))}
    </div>
  );
}

AutomationMetricGrid.propTypes = {
  metrics: PropTypes.object.isRequired,
};
