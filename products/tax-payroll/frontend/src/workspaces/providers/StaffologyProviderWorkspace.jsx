import EmployerList from './EmployerList';

export default function StaffologyProviderWorkspace({
  data,
  status,
  error,
  onBack,
  onRetry,
}) {
  return (
    <main className="provider-centre-shell">
      <button
        className="provider-back-button"
        type="button"
        onClick={onBack}
      >
        ← Back to Provider Centre
      </button>

      <header className="provider-centre-header">
        <div>
          <p className="eyebrow">Connected provider</p>
          <h1>Staffology</h1>
          <p>
            Live employers retrieved through the
            Enterprise Payroll Manager.
          </p>
        </div>

        <div className="provider-summary">
          <span>Employers</span>
          <strong>{data?.count ?? '—'}</strong>
        </div>
      </header>

      {status === 'loading' && (
        <section className="provider-state">
          Retrieving Staffology employers…
        </section>
      )}

      {status === 'error' && (
        <section className="provider-state provider-state-error">
          <strong>Employer discovery failed</strong>
          <span>{error}</span>
          <button type="button" onClick={onRetry}>
            Try again
          </button>
        </section>
      )}

      {status === 'ready' && (
        <section className="provider-employer-panel">
          <div className="provider-employer-heading">
            <div>
              <p className="eyebrow">Live provider data</p>
              <h2>Available employers</h2>
            </div>
            <small>Retrieved {data.retrievedAt}</small>
          </div>

          <EmployerList employers={data.employers} />
        </section>
      )}
    </main>
  );
}
