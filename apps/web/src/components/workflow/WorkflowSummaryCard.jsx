import React from 'react';

function formatLabel(value) {
  if (!value) return '—';
  return String(value).replaceAll('_', ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
}

export function WorkflowSummaryCard({ snapshot }) {
  const workflow = snapshot?.workflow || snapshot;

  if (!workflow) {
    return (
      <div className="identity-panel">
        <h2>Workflow Summary</h2>
        <p>No workflow selected.</p>
      </div>
    );
  }

  return (
    <div className="identity-panel">
      <div className="eyebrow">Orchestrator</div>
      <h2>{workflow.title || workflow.name || 'Workflow'}</h2>
      <p>Status: <strong>{formatLabel(workflow.status)}</strong></p>
      <p>Priority: <strong>{formatLabel(workflow.priority)}</strong></p>
      <p>Owner: <strong>{workflow.ownerId || 'Unassigned'}</strong></p>
      <p>Client: {workflow.clientId || '—'}</p>
      <p>Matter: {workflow.matterId || '—'}</p>
    </div>
  );
}
