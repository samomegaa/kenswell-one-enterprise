import PropTypes from 'prop-types';

export default function SlaHealthCard({ sla }) {
  return (
    <section className="sla-health-card">
      <header>
        <h3>SLA monitoring</h3>
        <strong>{sla.breached ? 'breached' : 'healthy'}</strong>
      </header>

      <dl>
        <div>
          <dt>Elapsed</dt>
          <dd>{sla.elapsedMinutes} min</dd>
        </div>
        <div>
          <dt>Threshold</dt>
          <dd>{sla.thresholdMinutes} min</dd>
        </div>
      </dl>
    </section>
  );
}

SlaHealthCard.propTypes = {
  sla: PropTypes.object.isRequired,
};
