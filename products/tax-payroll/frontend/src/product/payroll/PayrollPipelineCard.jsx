import PropTypes from 'prop-types';

export default function PayrollPipelineCard({ pipeline, metrics, onAdvance, onPause, onResume, onCancel }) {
  const paused = pipeline?.status === 'paused';
  const terminal = ['completed', 'cancelled'].includes(pipeline?.status);
  return (
    <section className="payroll-pipeline-card">
      <header><div><span>Calculation pipeline</span><h2>{pipeline?.status || 'Not ready'}</h2></div><strong>{metrics.completion}%</strong></header>
      <div className="payroll-pipeline-card__bar"><i style={{ width: `${metrics.completion}%` }} /></div>
      <dl>
        <div><dt>Checkpoint</dt><dd>{pipeline?.checkpoint || 'Unavailable'}</dd></div>
        <div><dt>Processed</dt><dd>{metrics.processed} / {metrics.total}</dd></div>
        <div><dt>Remaining</dt><dd>{metrics.remaining}</dd></div>
        <div><dt>Health</dt><dd>{metrics.health}</dd></div>
      </dl>
      <div className="payroll-pipeline-card__actions">
        {!terminal && !paused && <button type="button" onClick={onAdvance}>Run next</button>}
        {!terminal && !paused && <button type="button" onClick={onPause}>Pause</button>}
        {paused && <button type="button" onClick={onResume}>Resume</button>}
        {!terminal && <button type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </section>
  );
}
PayrollPipelineCard.propTypes = {
  pipeline: PropTypes.object,
  metrics: PropTypes.shape({ completion: PropTypes.number.isRequired, processed: PropTypes.number.isRequired, total: PropTypes.number.isRequired, remaining: PropTypes.number.isRequired, health: PropTypes.string.isRequired }).isRequired,
  onAdvance: PropTypes.func.isRequired, onPause: PropTypes.func.isRequired,
  onResume: PropTypes.func.isRequired, onCancel: PropTypes.func.isRequired,
};
