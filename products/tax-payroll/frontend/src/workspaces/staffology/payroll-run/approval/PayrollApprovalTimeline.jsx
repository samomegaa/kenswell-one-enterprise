import PropTypes from 'prop-types';

export default function PayrollApprovalTimeline({ history }) {
  return (
    <section className="payroll-approval-timeline">
      <h3>Approval history</h3>
      {history.length === 0 ? <p>No approval history was returned.</p> : (
        <ol>
          {history.map((entry) => (
            <li key={entry.id}>
              <strong>{entry.status}</strong>
              <span>{entry.actorLabel}</span>
              <time>{entry.timestampLabel}</time>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

PayrollApprovalTimeline.propTypes = {
  history: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    actorLabel: PropTypes.string.isRequired,
    timestampLabel: PropTypes.string.isRequired,
  })).isRequired,
};
