import PropTypes from 'prop-types';

export default function PayrollCalculationMetric({
  metric,
}) {
  return (
    <article className="payroll-calculation-metric">
      <span>{metric.label}</span>
      <strong>{metric.value}</strong>
    </article>
  );
}

PayrollCalculationMetric.propTypes = {
  metric: PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
};
