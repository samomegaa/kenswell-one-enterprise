import PropTypes from 'prop-types';

export default function OptimisationMetrics({ assessment }) {
  const values = [
    ['Efficiency', assessment ? `${assessment.efficiency}%` : '—'],
    ['Recommendations', assessment?.recommendations.length || 0],
    ['Queue balance', assessment?.workload.balanced ? 'Balanced' : 'Review'],
    ['Status', assessment?.status || 'Not evaluated'],
  ];

  return (
    <section className="optimisation-metrics">
      {values.map(([label, value]) => (
        <article key={label}>
          <span>{label}</span>
          <strong>{value}</strong>
        </article>
      ))}
    </section>
  );
}

OptimisationMetrics.propTypes = {
  assessment: PropTypes.object,
};
