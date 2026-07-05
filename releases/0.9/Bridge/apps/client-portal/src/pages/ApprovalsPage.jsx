import { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import { clientPortalApi } from '../api/clientPortalApi';

export default function ApprovalsPage() {
  const [approvals, setApprovals] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    clientPortalApi.approvals()
      .then((data) => setApprovals(data.approvals || []))
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <ErrorState message={error} />;
  if (!approvals) return <LoadingState label="Loading approvals..." />;

  return (
    <>
      <PageHeader title="Approvals" subtitle="Review and respond to approval requests." />
      <section className="panel">
        {approvals.length === 0 ? <p>No approvals yet.</p> : (
          <ul className="simple-list">
            {approvals.map((approval) => (
              <li key={approval.id}><strong>{approval.title}</strong><span>{approval.status}</span></li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
