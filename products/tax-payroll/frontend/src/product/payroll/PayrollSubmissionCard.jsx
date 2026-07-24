import PropTypes from 'prop-types';

export default function PayrollSubmissionCard({
  fpsRequest,
  readiness,
  submission,
  retryable,
  onPrepare,
  onQueue,
  onDispatch,
  onRetry,
  onCancel,
}) {
  return (
    <section className="payroll-submission-card">
      <header>
        <div>
          <span>FPS submission</span>
          <h2>{readiness.status}</h2>
        </div>
        <strong>{submission?.status || 'idle'}</strong>
      </header>

      <dl>
        <div>
          <dt>FPS request</dt>
          <dd>{fpsRequest?.status || 'not prepared'}</dd>
        </div>
        <div>
          <dt>Provider</dt>
          <dd>{fpsRequest?.provider || 'Staffology'}</dd>
        </div>
        <div>
          <dt>Attempts</dt>
          <dd>{submission?.attempts || 0}</dd>
        </div>
        <div>
          <dt>Readiness</dt>
          <dd>{readiness.reason}</dd>
        </div>
      </dl>

      <div className="payroll-submission-card__actions">
        {!fpsRequest && (
          <button type="button" onClick={onPrepare}>
            Prepare FPS
          </button>
        )}
        {readiness.dispatchable &&
        submission?.status === 'idle' && (
          <button type="button" onClick={onQueue}>
            Queue submission
          </button>
        )}
        {submission?.status === 'queued' && (
          <button type="button" onClick={onDispatch}>
            Dispatch
          </button>
        )}
        {retryable && (
          <button type="button" onClick={onRetry}>
            Retry
          </button>
        )}
        {!['accepted', 'cancelled'].includes(
          submission?.status
        ) && (
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </section>
  );
}

PayrollSubmissionCard.propTypes = {
  fpsRequest: PropTypes.object,
  readiness: PropTypes.object.isRequired,
  submission: PropTypes.object,
  retryable: PropTypes.bool.isRequired,
  onPrepare: PropTypes.func.isRequired,
  onQueue: PropTypes.func.isRequired,
  onDispatch: PropTypes.func.isRequired,
  onRetry: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
