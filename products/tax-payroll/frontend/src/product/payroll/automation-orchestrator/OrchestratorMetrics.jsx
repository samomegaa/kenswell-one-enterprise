import PropTypes from 'prop-types';

export default function OrchestratorMetrics({ metrics }) {
  const items = [
    ['Executions', metrics.total],
    ['Completed', metrics.completed],
    ['Failed', metrics.failed],
    ['Success rate', `${metrics.successRate}%`],
  ];

  return (
    <section className="orchestrator-metrics">
      {items.map(([label, value]) => (
        <article key={label}>
          <span>{label}</span>
          <strong>{value}</strong>
        </article>
      ))}
    </section>
  );
}

OrchestratorMetrics.propTypes = {
  metrics: PropTypes.object.isRequired,
};
