import PropTypes from 'prop-types';

export default function PayrollRuntimeCard({
  session,
  active,
  onDeactivate,
}) {
  return (
    <section className="payroll-runtime-card">
      <div>
        <span>Payroll runtime</span>
        <h2>
          {session?.employerName ||
            'Employer session not active'}
        </h2>
      </div>

      <dl>
        <div>
          <dt>Status</dt>
          <dd>{active ? 'Active' : 'Inactive'}</dd>
        </div>

        <div>
          <dt>Provider</dt>
          <dd>{session?.provider || 'Staffology'}</dd>
        </div>

        <div>
          <dt>Workspace</dt>
          <dd>
            {active ? 'Activated' : 'Awaiting employer'}
          </dd>
        </div>
      </dl>

      {active && (
        <button type="button" onClick={onDeactivate}>
          Deactivate session
        </button>
      )}
    </section>
  );
}

PayrollRuntimeCard.propTypes = {
  session: PropTypes.object,
  active: PropTypes.bool.isRequired,
  onDeactivate: PropTypes.func.isRequired,
};
