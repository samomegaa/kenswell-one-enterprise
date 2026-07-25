import PropTypes from 'prop-types';

export default function OptimisationRecommendationsPanel({
  recommendations,
}) {
  return (
    <section className="optimisation-panel">
      <header>
        <h3>Optimisation recommendations</h3>
        <strong>{recommendations.length}</strong>
      </header>

      {recommendations.length === 0 ? (
        <p>No optimisation intervention required.</p>
      ) : (
        recommendations.map((item) => (
          <article key={item.id || item.queueId}>
            <strong>{item.action}</strong>
            <span>{item.reason}</span>
          </article>
        ))
      )}
    </section>
  );
}

OptimisationRecommendationsPanel.propTypes = {
  recommendations: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired,
};
