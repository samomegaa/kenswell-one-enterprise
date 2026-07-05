import React, { useEffect, useState } from 'react';
import { WorkflowWorkspace } from '../components/workflow/WorkflowWorkspace.jsx';
import { apiGet, apiPost } from '../services/api.js';

export function WorkflowWorkspacePage() {
  const [workflows, setWorkflows] = useState([]);
  const [snapshot, setSnapshot] = useState(null);
  const [error, setError] = useState('');

  async function loadWorkflows() {
    const data = await apiGet('/api/workflows');
    setWorkflows(data.workflows || []);
  }

  async function openWorkflow(id) {
    setError('');
    try {
      const data = await apiGet(`/api/workflows/${id}`);
      setSnapshot(data.snapshot);
    } catch (err) {
      setError(err.message);
    }
  }

  async function refreshCurrent() {
    const id = snapshot?.workflow?.id || snapshot?.id;
    if (!id) return;
    await openWorkflow(id);
    await loadWorkflows();
  }

  async function action(path, body = {}) {
    const id = snapshot?.workflow?.id || snapshot?.id;
    if (!id) return;
    setError('');
    try {
      const data = await apiPost(`/api/workflows/${id}/${path}`, { actorId: 'system', ...body });
      setSnapshot(data.snapshot || data.workflow || snapshot);
      await loadWorkflows();
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    loadWorkflows().catch(err => setError(err.message));
  }, []);

  return (
    <div>
      {error && <div className="status-error">{error}</div>}

      <div className="identity-panel">
        <h2>Workflow Queue</h2>
        <div className="role-grid">
          {workflows.length === 0 && <p>No workflows yet.</p>}
          {workflows.map(item => (
            <button className="client-card" key={item.id} onClick={() => openWorkflow(item.id)}>
              <span>{item.status}</span>
              <strong>{item.title || item.name}</strong>
              <small>{item.clientId || 'No client'} · {item.matterId || 'No matter'}</small>
            </button>
          ))}
        </div>
      </div>

      <WorkflowWorkspace
        snapshot={snapshot}
        onProgress={() => action('progress')}
        onBlock={() => action('block', { reason: 'Blocked from workspace' })}
        onResume={() => action('resume')}
        onComplete={() => action('complete')}
      />
    </div>
  );
}
