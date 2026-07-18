import PropTypes from 'prop-types';

import ReadinessProgress
  from './ReadinessProgress';

function titleFor(level) {
  return level.charAt(0).toUpperCase() +
    level.slice(1);
}

export default function ReadinessCard({
  level,
  result,
  onOpenMissing,
}) {
  return (
    <article
      className={
        `readiness-card readiness-card--` +
        `${result.status}`
      }
    >
      <header>
        <div>
          <span>{titleFor(level)}</span>
          <strong>{result.status}</strong>
        </div>

        <ReadinessProgress
          score={result.score}
        />
      </header>

      <dl>
        <div>
          <dt>Required</dt>
          <dd>{result.required}</dd>
        </div>

        <div>
          <dt>Completed</dt>
          <dd>{result.completed}</dd>
        </div>

        <div>
          <dt>Missing</dt>
          <dd>{result.missing}</dd>
        </div>
      </dl>

      {result.missing > 0 && (
        <button
          type="button"
          onClick={() =>
            onOpenMissing?.(level, result)
          }
        >
          Review missing fields
        </button>
      )}
    </article>
  );
}

ReadinessCard.propTypes = {
  level: PropTypes.string.isRequired,
  result: PropTypes.object.isRequired,
  onOpenMissing: PropTypes.func,
};
