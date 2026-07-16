import { useEffect, useState } from 'react';
import { getClientEmployees } from '../../services/client-employee-api';

export default function LinkedEmployerBridge({ client, onOpenPayroll }) {
  const [employeeCount, setEmployeeCount] = useState(null);

  useEffect(() => {
    let active = true;
    getClientEmployees(client.id)
      .then((result) => {
        if (active) setEmployeeCount(result.count);
      })
      .catch(() => {
        if (active) setEmployeeCount(null);
      });
    return () => { active = false; };
  }, [client.id]);

  return (
    <div className="linked-employer-bridge">
      <div>
        <span>Linked Kenswell client</span>
        <strong>{client.businessName}</strong>
      </div>
      <div>
        <span>Canonical employees</span>
        <strong>{employeeCount ?? '—'}</strong>
      </div>
      <button type="button" onClick={onOpenPayroll}>
        Open client payroll
      </button>
    </div>
  );
}
