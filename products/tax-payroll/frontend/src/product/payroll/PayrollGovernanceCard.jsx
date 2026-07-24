import PropTypes from 'prop-types';

export default function PayrollGovernanceCard({
  summary,
  compliance,
  approval,
  onApprove,
  onReject,
}) {
  const decided = ['approved', 'rejected'].includes(
    approval?.status
  );

  return (
    <section className="payroll-governance-card">
      <header>
        <div>
          <span>Validation & approval</span>
          <h2>{compliance.status}</h2>
        </div>
        <strong>{approval?.status || 'pending'}</strong>
      </header>

      <dl>
        <div>
          <dt>Open findings</dt>
          <dd>{summary.open}</dd>
        </div>
        <div>
          <dt>Blocking</dt>
          <dd>{summary.blocking}</dd>
        </div>
        <div>
          <dt>Errors</dt>
          <dd>{summary.errors}</dd>
        </div>
        <div>
          <dt>Warnings</dt>
          <dd>{summary.warnings}</dd>
        </div>
      </dl>

      <p>{compliance.reason}</p>

      {!decided && (
        <div className="payroll-governance-card__actions">
          <button
            type="button"
            disabled={!compliance.approvable}
            onClick={onApprove}
          >
            Approve payroll
          </button>
          <button type="button" onClick={onReject}>
            Reject
          </button>
        </div>
      )}
    </section>
  );
}

PayrollGovernanceCard.propTypes = {
  summary: PropTypes.object.isRequired,
  compliance: PropTypes.object.isRequired,
  approval: PropTypes.object,
  onApprove: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
};
