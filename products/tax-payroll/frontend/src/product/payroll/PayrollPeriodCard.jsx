import PropTypes from 'prop-types';

export default function PayrollPeriodCard({
  period,
  active,
  onClose,
}) {
  return (
    <section className="payroll-period-card">
      <div>
        <span>Payroll period</span>
        <h2>{period?.label || 'No active period'}</h2>
      </div>

      <dl>
        <div>
          <dt>Tax year</dt>
          <dd>{period?.taxYear || 'Not available'}</dd>
        </div>

        <div>
          <dt>Frequency</dt>
          <dd>{period?.frequency || 'Not available'}</dd>
        </div>

        <div>
          <dt>Stage</dt>
          <dd>{period?.stage || 'Created'}</dd>
        </div>
      </dl>

      {active && (
        <button type="button" onClick={onClose}>
          Close period
        </button>
      )}
    </section>
  );
}

PayrollPeriodCard.propTypes = {
  period: PropTypes.object,
  active: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
