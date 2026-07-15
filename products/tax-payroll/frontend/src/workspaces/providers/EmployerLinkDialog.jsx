import { useMemo, useState } from 'react';

export default function EmployerLinkDialog({
  employer,
  clients,
  onCancel,
  onConfirm,
  busy,
  error,
}) {
  const eligibleClients = useMemo(
    () => clients.filter((client) => client.payroll?.active),
    [clients]
  );

  const [clientId, setClientId] = useState(
    eligibleClients[0]?.id || ''
  );

  return (
    <div className="provider-dialog-backdrop">
      <section className="provider-dialog" role="dialog" aria-modal="true">
        <p className="eyebrow">Employer linking</p>
        <h2>Link {employer.name}</h2>
        <p>
          Select the Kenswell client whose payroll engagement
          belongs to this Staffology employer.
        </p>

        <label>
          Kenswell client
          <select
            value={clientId}
            onChange={(event) => setClientId(event.target.value)}
          >
            {eligibleClients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.businessName}
              </option>
            ))}
          </select>
        </label>

        {error && <div className="provider-dialog-error">{error}</div>}

        <div className="provider-dialog-actions">
          <button type="button" onClick={onCancel} disabled={busy}>
            Cancel
          </button>
          <button
            type="button"
            disabled={!clientId || busy}
            onClick={() => onConfirm(clientId)}
          >
            {busy ? 'Linking…' : 'Confirm link'}
          </button>
        </div>
      </section>
    </div>
  );
}
