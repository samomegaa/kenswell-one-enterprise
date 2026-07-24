import PropTypes from 'prop-types';

export default function DashboardActionCard({ action }) {
  return (
    <article className="dashboard-action-card">
      <span>{action.status}</span>
      <h2>{action.title}</h2>
      <p>{action.description}</p>
    </article>
  );
}

DashboardActionCard.propTypes = {
  action: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};
