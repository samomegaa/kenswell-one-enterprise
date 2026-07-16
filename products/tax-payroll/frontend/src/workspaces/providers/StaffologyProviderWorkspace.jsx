import { useEffect, useMemo, useState } from 'react';
import { getWorkspaceClients, linkStaffologyEmployer } from '../../services/provider-centre-api';
import EmployerLinkDialog from './EmployerLinkDialog';
import EmployerList from './EmployerList';

export default function StaffologyProviderWorkspace({ data, status, error, onBack, onRetry, onOpenClientPayroll }) {
  const [clients, setClients] = useState([]);
  const [selected, setSelected] = useState(null);
  const [linkError, setLinkError] = useState('');
  const [busy, setBusy] = useState(false);

  async function loadClients() {
    try { setClients(await getWorkspaceClients()); } catch { setClients([]); }
  }

  useEffect(() => { loadClients(); }, []);

  const linkedClient = useMemo(() => clients.find((client) => client.payroll?.employer?.provider?.linked === true) || null, [clients]);

  async function confirmLink(clientId) {
    setBusy(true); setLinkError('');
    try {
      await linkStaffologyEmployer({ clientId, externalEmployerId: selected.externalEmployerId, employerName: selected.name });
      setSelected(null);
      await Promise.all([loadClients(), onRetry()]);
    } catch (requestError) { setLinkError(requestError.message); }
    finally { setBusy(false); }
  }

  return (
    <main className="provider-centre-shell">
      <button className="provider-back-button" type="button" onClick={onBack}>← Back to Provider Centre</button>
      <header className="provider-centre-header"><div><p className="eyebrow">Connected provider</p><h1>Staffology</h1><p>Open a linked client directly in its Payroll workspace.</p></div><div className="provider-summary"><span>Employers</span><strong>{data?.count ?? '—'}</strong></div></header>
      {status === 'loading' && <section className="provider-state">Retrieving Staffology employers…</section>}
      {status === 'error' && <section className="provider-state provider-state-error"><strong>Employer discovery failed</strong><span>{error}</span><button type="button" onClick={onRetry}>Try again</button></section>}
      {status === 'ready' && <section className="provider-employer-panel"><EmployerList employers={data.employers} linkedClient={linkedClient} onLink={setSelected} onOpenClientPayroll={onOpenClientPayroll} /></section>}
      {selected && <EmployerLinkDialog employer={selected} clients={clients} busy={busy} error={linkError} onCancel={() => setSelected(null)} onConfirm={confirmLink} />}
    </main>
  );
}
