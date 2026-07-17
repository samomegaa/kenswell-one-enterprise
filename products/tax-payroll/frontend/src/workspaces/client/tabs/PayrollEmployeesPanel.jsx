import { useEffect, useMemo, useState } from 'react';

import {
  getClientEmployees,
  synchroniseClientEmployees,
} from '../../../services/client-employee-api';

import {
  EmployeeCreationWorkspace,
  EmployeeWorkspace,
} from '../../employees';

import PayrollEmployerContext from './PayrollEmployerContext';
import PayrollEmployeeTable from './PayrollEmployeeTable';

function formatDate(value) {
  if (!value) return 'Not yet';

  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

export default function PayrollEmployeesPanel({
  client,
  onEmployeeStateChange,
}) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');
  const [syncing, setSyncing] = useState(false);
  const [notice, setNotice] = useState('');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [creating, setCreating] = useState(false);

  async function load() {
    setStatus('loading');
    setError('');

    try {
      const result = await getClientEmployees(client.id);
      setData(result);
      onEmployeeStateChange?.(result.count);
      setStatus('ready');
    } catch (requestError) {
      setError(requestError.message);
      setStatus('error');
    }
  }

  async function synchronise() {
    setSyncing(true);
    setError('');
    setNotice('');

    try {
      const result = await synchroniseClientEmployees(client.id);
      const suffix = result.employeeCount === 1 ? '' : 's';
      setNotice(`${result.employeeCount} employee${suffix} synchronised`);
      await load();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSyncing(false);
    }
  }

  useEffect(() => {
    setSelectedEmployeeId(null);
    setCreating(false);
    load();
  }, [client.id]);

  const lastSynchronised = useMemo(
    () => formatDate(data?.lastSynchronisedAt),
    [data?.lastSynchronisedAt]
  );

  const employerId =
    client.payroll?.employer?.id ||
    client.payroll?.employer?.employerId ||
    '';

  if (creating) {
    return (
      <EmployeeCreationWorkspace
        clientId={client.id}
        employerId={employerId}
        onCancel={() => setCreating(false)}
        onCreated={(employee) => {
          setCreating(false);
          setSelectedEmployeeId(employee.id);
          load();
        }}
      />
    );
  }

  if (selectedEmployeeId) {
    return (
      <EmployeeWorkspace
        employeeId={selectedEmployeeId}
        onBack={() => setSelectedEmployeeId(null)}
      />
    );
  }

  return (
    <section className="payroll-employees-panel">
      <PayrollEmployerContext
        employer={client.payroll?.employer}
        employeeCount={data?.count || 0}
        lastSynchronisedAt={lastSynchronised}
      />

      <header className="payroll-employees-header">
        <div>
          <p className="eyebrow">Canonical employees</p>
          <h2>Employees</h2>
          <p>Create or synchronise employees in the payroll workspace.</p>
        </div>

        <div className="payroll-employees-header__actions">
          <button
            type="button"
            onClick={() => setCreating(true)}
            disabled={!employerId}
          >
            Create employee
          </button>
          <button
            type="button"
            onClick={synchronise}
            disabled={syncing || data?.linked === false}
          >
            {syncing ? 'Synchronising…' : 'Synchronise employees'}
          </button>
        </div>
      </header>

      {notice && <div className="payroll-employees-notice">{notice}</div>}
      {error && <div className="payroll-employees-error">{error}</div>}

      {status === 'loading' && (
        <div className="payroll-employees-state">Loading employees…</div>
      )}

      {status === 'ready' && (
        <>
          <div className="payroll-employees-summary">
            <strong>{data.count}</strong>
            <span>Last synchronised: {lastSynchronised}</span>
          </div>

          <PayrollEmployeeTable
            employees={data.employees}
            onOpenEmployee={setSelectedEmployeeId}
          />
        </>
      )}
    </section>
  );
}
