import PropTypes from 'prop-types';
import { formatMoney } from './payrollProcessingModel';

export default function PayrollApprovalStep({
  run,
  preview,
  approving,
  processing,
  onApprove,
  onProcess,
}) {
  const approved = run?.status === 'approved';
  const completed = run?.status === 'completed';

  return (
    <div className="payroll-approval">
      <div className="workspace-card-grid">
        <article>
          <span>Run status</span>
          <strong>{run?.status || 'draft'}</strong>
        </article>
        <article>
          <span>Employees</span>
          <strong>{run?.employeeIds?.length || 0}</strong>
        </article>
        <article>
          <span>Net payment</span>
          <strong>{formatMoney(preview?.totals?.netPay)}</strong>
        </article>
      </div>

      <div className="payroll-approval__actions">
        <button
          type="button"
          onClick={onApprove}
          disabled={approved || completed || approving}
        >
          {approving ? 'Approving…' : approved ? 'Approved' : 'Approve run'}
        </button>

        <button
          type="button"
          onClick={onProcess}
          disabled={!approved || completed || processing}
        >
          {processing
            ? 'Processing…'
            : completed
              ? 'Completed'
              : 'Process payroll'}
        </button>
      </div>
    </div>
  );
}

PayrollApprovalStep.propTypes = {
  run: PropTypes.object,
  preview: PropTypes.object,
  approving: PropTypes.bool.isRequired,
  processing: PropTypes.bool.isRequired,
  onApprove: PropTypes.func.isRequired,
  onProcess: PropTypes.func.isRequired,
};
