import { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import StatusBadge from '../components/StatusBadge';
import EmptyState from '../components/EmptyState';
import ActionNotice from '../components/ActionNotice';
import { clientPortalApi } from '../api/clientPortalApi';

export default function ApprovalsPage() {
  const [approvals, setApprovals] = useState(null);
  const [decisionNote, setDecisionNote] = useState('');
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');

  function loadApprovals() {
    return clientPortalApi.approvals()
      .then((data) => setApprovals(data.approvals || []))
      .catch((err) => setError(err.message));
  }

  useEffect(() => {
    loadApprovals();
  }, []);

  async function decide(approvalId, decision) {
    setNotice('');
    setError('');

    try {
      if (decision === 'approve') {
        await clientPortalApi.approveRequest(approvalId, { decisionNote });
      } else {
        await clientPortalApi.rejectRequest(approvalId, { decisionNote });
      }

      setDecisionNote('');
      setNotice(`Approval ${decision === 'approve' ? 'approved' : 'rejected'}.`);
      await loadApprovals();
    } catch (err) {
      setError(err.message);
    }
  }

  if (!approvals && error) return <ErrorState message={error} />;
  if (!approvals) return <LoadingState label="Loading approvals..." />;

  return (
    <>
      <PageHeader title="Approvals" subtitle="Review and respond to approval requests." />
      <ActionNotice error={error} message={notice} />

      <section className="panel form-panel">
        <label>
          Decision note
          <textarea value={decisionNote} onChange={(e) => setDecisionNote(e.target.value)} />
        </label>
      </section>

      <section className="panel">
        {!approvals.length ? (
          <EmptyState title="No pending approvals" message="Approval requests will appear here when action is needed." />
        ) : (
          <ul className="data-list">
            {approvals.map((approval) => (
              <li key={approval.id}>
                <div>
                  <strong>{approval.title}</strong>
                  <small>{approval.type}</small>
                </div>
                <div className="row-actions">
                  <StatusBadge value={approval.status} />
                  {approval.status === 'pending' ? (
                    <>
                      <button type="button" className="small-button" onClick={() => decide(approval.id, 'approve')}>
                        Approve
                      </button>
                      <button type="button" className="small-button danger" onClick={() => decide(approval.id, 'reject')}>
                        Reject
                      </button>
                    </>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
