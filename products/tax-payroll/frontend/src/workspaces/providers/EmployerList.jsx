import LinkedEmployerBridge from './LinkedEmployerBridge';

export default function EmployerList({ employers, linkedClient, onLink, onOpenClientPayroll }) {
  if (!employers.length) return <section className="provider-empty-state">No employers were returned by Staffology.</section>;

  return (
    <div className="provider-employer-list">
      {employers.map((employer) => {
        const linked = linkedClient?.payroll?.employer?.provider?.externalEmployerId === employer.externalEmployerId;
        return (
          <article className={linked ? 'provider-employer-row linked' : 'provider-employer-row'} key={employer.externalEmployerId}>
            <div className="provider-employer-mark">{employer.name.slice(0, 1).toUpperCase()}</div>
            <div className="provider-employer-copy"><strong>{employer.name}</strong><span>{employer.externalEmployerId}</span></div>
            <div className="provider-employer-year"><span>Tax year</span><strong>{employer.currentTaxYear || employer.startTaxYear || 'Not supplied'}</strong></div>
            <button type="button" className="provider-employer-action" disabled={linked} onClick={() => onLink(employer)}>{linked ? 'Linked' : 'Link to client'}</button>
            {linked && <LinkedEmployerBridge clientName={linkedClient.businessName} employeeCount={linkedClient.payroll?.employer?.employeeCount || 0} onOpenPayroll={() => onOpenClientPayroll(linkedClient)} />}
          </article>
        );
      })}
    </div>
  );
}
