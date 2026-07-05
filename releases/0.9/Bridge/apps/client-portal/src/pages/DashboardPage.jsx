import { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import { clientPortalApi } from '../api/clientPortalApi';

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
        {(dashboard.recentActivity || []).length === 0 ? (
          <p>No recent activity yet.</p>
        ) : (
          <ul className="simple-list">
            {dashboard.recentActivity.map((item) => (
              <li key={item.id}>
                <strong>{item.title}</strong>
                <span>{item.event}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
