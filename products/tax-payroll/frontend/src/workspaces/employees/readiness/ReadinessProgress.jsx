import PropTypes from 'prop-types';

export default function ReadinessProgress({
  score = 0,
}) {
  const value = Math.max(
    0,
    Math.min(100, Number(score) || 0)
  );

  return (
    <div className="readiness-progress">
      <div
        className="readiness-progress__track"
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={value}
      >
        <span
          className="readiness-progress__bar"
          style={{ width: `${value}%` }}
        />
      </div>

      <strong>{value}%</strong>
    </div>
  );
}

ReadinessProgress.propTypes = {
  score: PropTypes.number,
};
