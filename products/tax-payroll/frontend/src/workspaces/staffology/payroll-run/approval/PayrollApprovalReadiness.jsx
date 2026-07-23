import PropTypes from 'prop-types';

function ApprovalList({ title, items, emptyMessage }) {
  return (
    <section className="payroll-approval-list">
      <h3>{title}</h3>
      {items.length === 0 ? <p>{emptyMessage}</p> : (
        <ul>{items.map((item) => <li key={item.id}>{item.label}</li>)}</ul>
      )}
    </section>
  );
}

export default function PayrollApprovalReadiness({ blockers, requirements }) {
  return (
    <div className="payroll-approval-readiness">
      <ApprovalList title="Outstanding blockers" items={blockers} emptyMessage="No blocking issues were returned." />
      <ApprovalList title="Approval requirements" items={requirements} emptyMessage="No approval requirements were returned." />
    </div>
  );
}

const listType = PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string.isRequired, label: PropTypes.string.isRequired }));
ApprovalList.propTypes = { title: PropTypes.string.isRequired, items: listType.isRequired, emptyMessage: PropTypes.string.isRequired };
PayrollApprovalReadiness.propTypes = { blockers: listType.isRequired, requirements: listType.isRequired };
