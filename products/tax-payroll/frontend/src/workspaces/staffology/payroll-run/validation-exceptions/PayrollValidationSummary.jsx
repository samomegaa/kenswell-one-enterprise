import PropTypes from 'prop-types';

const METRICS = Object.freeze([
  ['Total issues', 'total'],
  ['Errors', 'error'],
  ['Warnings', 'warning'],
  ['Information', 'information'],
]);

export default function PayrollValidationSummary({
  counts,
}) {
  return (
    <div className="payroll-validation-summary">
      {METRICS.map(([label, key]) => (
        <article key={key}>
          <span>{label}</span>
          <strong>{counts[key]}</strong>
        </article>
      ))}
    </div>
  );
}

PayrollValidationSummary.propTypes = {
  counts: PropTypes.shape({
    total: PropTypes.number.isRequired,
    error: PropTypes.number.isRequired,
    warning: PropTypes.number.isRequired,
    information: PropTypes.number.isRequired,
  }).isRequired,
};
