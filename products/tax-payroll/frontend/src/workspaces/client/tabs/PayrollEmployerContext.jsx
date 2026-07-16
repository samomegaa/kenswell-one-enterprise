function formatStatus(value) {
  return String(value || 'unknown')
    .replaceAll('_', ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default function PayrollEmployerContext({ employer, employeeCount, lastSynchronisedAt }) {
  const provider = employer?.provider || {};
  const employerName = provider.externalEmployerName || employer?.name || 'Not linked';

  return (
    <section className="payroll-employer-context">
      <div className="payroll-employer-primary">
        <span>Linked payroll employer</span>
        <strong>{employerName}</strong>
      </div>
      <div>
        <span>Provider</span>
        <strong>{provider.name ? formatStatus(provider.name) : 'Not selected'}</strong>
      </div>
      <div>
        <span>Connection</span>
        <strong>{formatStatus(provider.status)}</strong>
      </div>
      <div>
        <span>Employees</span>
        <strong>{employeeCount}</strong>
      </div>
      <div className="payroll-employer-id-row">
        <span>External employer ID</span>
        <strong>{provider.externalEmployerId || 'Not available'}</strong>
      </div>
      <div>
        <span>Last synchronised</span>
        <strong>{lastSynchronisedAt || 'Not yet'}</strong>
      </div>
    </section>
  );
}
