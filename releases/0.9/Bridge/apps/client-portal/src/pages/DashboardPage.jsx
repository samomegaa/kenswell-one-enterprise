import PageHeader from '../components/PageHeader';

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="A secure overview of your matters, documents, messages, tasks and approvals."
      />

      <div className="metric-grid">
        <div className="metric-card"><span>Open Matters</span><strong>—</strong></div>
        <div className="metric-card"><span>Requested Documents</span><strong>—</strong></div>
        <div className="metric-card"><span>Unread Messages</span><strong>—</strong></div>
        <div className="metric-card"><span>Open Tasks</span><strong>—</strong></div>
        <div className="metric-card"><span>Pending Approvals</span><strong>—</strong></div>
      </div>

      <section className="panel">
        <h2>Recent Activity</h2>
        <p>Your recent activity will appear here once connected to the API.</p>
      </section>
    </>
  );
}
