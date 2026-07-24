import PropTypes from 'prop-types';

export default function PayrollExecutionCard({
  execution,
  nextState,
  onAdvance,
  onPause,
  onResume,
  onCancel,
}) {
  const paused = execution?.status === 'paused';
  const terminal = ['completed', 'cancelled'].includes(
    execution?.status
  );

  return (
    <section className="payroll-execution-card">
      <div>
        <span>Payroll processing</span>
        <h2>{execution?.status || 'Not ready'}</h2>
      </div>

      <dl>
        <div>
          <dt>Current stage</dt>
          <dd>{execution?.state || 'Unavailable'}</dd>
        </div>
        <div>
          <dt>Next stage</dt>
          <dd>{nextState || 'Complete'}</dd>
        </div>
        <div>
          <dt>Execution</dt>
          <dd>{terminal ? 'Final' : 'Healthy'}</dd>
        </div>
      </dl>

      <div className="payroll-execution-card__actions">
        {!terminal && !paused && (
          <button type="button" onClick={onAdvance}>
            Advance
          </button>
        )}
        {!terminal && !paused && (
          <button type="button" onClick={onPause}>
            Pause
          </button>
        )}
        {paused && (
          <button type="button" onClick={onResume}>
            Resume
          </button>
        )}
        {!terminal && (
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </section>
  );
}

PayrollExecutionCard.propTypes = {
  execution: PropTypes.object,
  nextState: PropTypes.string,
  onAdvance: PropTypes.func.isRequired,
  onPause: PropTypes.func.isRequired,
  onResume: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
