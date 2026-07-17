import PropTypes from 'prop-types';
import { formatMoney } from './payrollProcessingModel';

export default function PayrollPreviewStep({
  preview,
  loading,
  onPreview,
}) {
  if (!preview) {
    return (
      <div className="payroll-preview-empty">
        <p>Generate gross-to-net figures before approval.</p>
        <button type="button" onClick={onPreview} disabled={loading}>
          {loading ? 'Generating…' : 'Generate preview'}
        </button>
      </div>
    );
  }

  return (
    <div className="payroll-preview">
      <div className="workspace-card-grid">
        <article>
          <span>Gross pay</span>
          <strong>{formatMoney(preview.totals?.grossPay)}</strong>
        </article>
        <article>
          <span>PAYE</span>
          <strong>{formatMoney(preview.totals?.paye)}</strong>
        </article>
        <article>
          <span>Employee NI</span>
          <strong>{formatMoney(preview.totals?.employeeNi)}</strong>
        </article>
        <article>
          <span>Employer NI</span>
          <strong>{formatMoney(preview.totals?.employerNi)}</strong>
        </article>
        <article>
          <span>Net pay</span>
          <strong>{formatMoney(preview.totals?.netPay)}</strong>
        </article>
      </div>

      <div className="payroll-preview__table">
        {(preview.employees || []).map((employee) => (
          <div key={employee.employeeId}>
            <strong>{employee.displayName}</strong>
            <span>{formatMoney(employee.grossPay)}</span>
            <span>{formatMoney(employee.netPay)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

PayrollPreviewStep.propTypes = {
  preview: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  onPreview: PropTypes.func.isRequired,
};
