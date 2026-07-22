import PropTypes from 'prop-types';

export default function DashboardMetricCard({ metric }) {
  return (
    <article className="dashboard-metric-card">
      <span>{metric.label}</span>
      <strong>{metric.value}</strong>
    </article>
  );
}

DashboardMetricCard.propTypes = {
  metric: PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
};
