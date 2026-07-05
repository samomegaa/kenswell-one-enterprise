import { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import { clientPortalApi } from '../api/clientPortalApi';
import DataList from '../components/DataList';

export default function DashboardPage() {
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    clientPortalApi.dashboard()
      .then(setDashboard)
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <ErrorState message={error} />;
  if (!dashboard) return <LoadingState label="Loading dashboard..." />;

  const summary = dashboard.summary || {};

  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="A secure overview of your matters, documents, messages, tasks and approvals."
      />

      <div className="metric-grid">
        <div className="metric-card"><span>Open Matters</span><strong>{summary.openMatters || 0}</strong></div>
        <div className="metric-card"><span>Requested Documents</span><strong>{summary.requestedDocuments || 0}</strong></div>
        <div className="metric-card"><span>Unread Messages</span><strong>{summary.unreadMessages || 0}</strong></div>
        <div className="metric-card"><span>Open Tasks</span><strong>{summary.openTasks || 0}</strong></div>
        <div className="metric-card"><span>Pending Approvals</span><strong>{summary.pendingApprovals || 0}</strong></div>
      </div>

      <section className="panel">
        <h2>Recent Activity</h2>
        <DataList
          items={dashboard.recentActivity || []}
          emptyTitle="No recent activity yet"
          emptyMessage="Your recent portal activity will appear here."
          getTitle={(item) => item.title}
          getStatus={(item) => item.event}
          getMeta={(item) => item.type}
        />
      </section>
    </>
  );
}
