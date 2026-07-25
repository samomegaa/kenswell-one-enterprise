import PropTypes from 'prop-types';

export default function DecisionMetrics({ decision }) {
  const metrics = [
    ['Risk', decision ? `${decision.risk}%` : '—'],
    ['Confidence', decision ? `${decision.confidence}%` : '—'],
    ['Status', decision?.status || 'not-evaluated'],
    ['Strategy', decision?.strategy || 'observe'],
  ];

  return (
    <section className="decision-metrics">
      {metrics.map(([label, value]) => (
        <article key={label}>
          <span>{label}</span>
          <strong>{value}</strong>
        </article>
      ))}
    </section>
  );
}

DecisionMetrics.propTypes = {
  decision: PropTypes.object,
};
