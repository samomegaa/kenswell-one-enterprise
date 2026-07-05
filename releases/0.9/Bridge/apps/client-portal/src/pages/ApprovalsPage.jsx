import { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import DataList from '../components/DataList';
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
        <DataList
          items={approvals}
          emptyTitle="No pending approvals"
          emptyMessage="Approval requests will appear here when action is needed."
          getTitle={(approval) => approval.title}
          getStatus={(approval) => approval.status}
          getMeta={(approval) => approval.type}
        />
      </section>
    </>
  );
}
