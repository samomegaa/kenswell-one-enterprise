import PropTypes from 'prop-types';

export default function DashboardMetric({ metric }) {
  return (
    <article className="dashboard-metric">
      <span>{metric.label}</span>
      <strong>{metric.value}</strong>
      <p>{metric.detail}</p>
    </article>
  );
}

DashboardMetric.propTypes = {
  metric: PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    detail: PropTypes.string.isRequired,
  }).isRequired,
};
