import PropTypes from 'prop-types';

function readinessLabel(level) {
  return level.charAt(0).toUpperCase() +
    level.slice(1);
}

export default function WorkspaceReadinessStrip({
  readiness,
}) {
  const levels = Object.entries(
    readiness?.levels || {}
  );

  return (
    <div
      className="enterprise-readiness-strip"
      aria-label="Employee readiness"
    >
      {levels.map(([level, result]) => (
        <article
          key={level}
          className={
            `enterprise-readiness-card ` +
            `enterprise-readiness-card--${result.status}`
          }
        >
          <span>{readinessLabel(level)}</span>
          <strong>{result.score}%</strong>
          <small>
            {result.missing
              ? `${result.missing} missing`
              : 'Ready'}
          </small>
        </article>
      ))}
    </div>
  );
}

WorkspaceReadinessStrip.propTypes = {
  readiness: PropTypes.object,
};
