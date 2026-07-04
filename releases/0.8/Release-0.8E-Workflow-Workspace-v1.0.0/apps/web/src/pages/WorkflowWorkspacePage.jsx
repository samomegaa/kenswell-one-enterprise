import React, { useEffect, useState } from 'react';
import { apiGet, apiPost } from '../services/api.js';
import { WorkflowWorkspace } from '../components/workflow/WorkflowWorkspace.jsx';

export function WorkflowWorkspacePage() {
  const [workflows, setWorkflows] = useState([]);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState('');

  async function loadWorkflows() {
    const data = await apiGet('/api/workflows');
    setWorkflows(data.workflows || []);
  }

  async function openWorkflow(id) {
    const data = await apiGet(`/api/workflows/${id}`);
    setSelected(data.snapshot);
  }

  async function action(path) {
    if (!selected?.workflow?.id) return;
    const data = await apiPost(`/api/workflows/${selected.workflow.id}/${path}`, { actorId: 'system' });
    setSelected(data.snapshot);
    await loadWorkflows();
  }

  useEffect(() => {
    loadWorkflows().catch(err => setError(err.message));
  }, []);

  return (
    <div className="workspace-page">
      <div className="eyebrow">Kenswell One · Orchestrator</div>
      <h1>Workflow Workspace</h1>
      <p>Manage workflow status, stages, blockers, ownership and completion.</p>

      {error && <div className="status-error">{error}</div>}

      <div className="workspace-grid">
        <div className="identity-panel">
          <h2>Workflow Queue</h2>
          <button className="demo-button" onClick={loadWorkflows}>Refresh</button>

          <div className="role-grid">
            {workflows.map(item => (
              <button className="client-card" key={item.id} onClick={() => openWorkflow(item.id)}>
                <span>{item.status}</span>
                <strong>{item.title}</strong>
                <small>{item.workflowKey}</small>
              </button>
            ))}
          </div>
        </div>

        <WorkflowWorkspace
          snapshot={selected}
          onBlock={() => action('block')}
          onResume={() => action('resume')}
          onComplete={() => action('complete')}
        />
      </div>
    </div>
  );
}
