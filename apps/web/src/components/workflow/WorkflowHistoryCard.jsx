import React from 'react';

export function WorkflowHistoryCard({ snapshot }) {
  const history = snapshot?.history || snapshot?.activity || [];

  return (
    <div className="identity-panel">
      <h2>Workflow History</h2>
      <div className="permission-list">
        {history.length === 0 && <span>No workflow history yet</span>}
        {history.map(item => (
          <span key={item.id}>{item.type} · {item.actorId || 'system'}</span>
        ))}
      </div>
    </div>
  );
}
