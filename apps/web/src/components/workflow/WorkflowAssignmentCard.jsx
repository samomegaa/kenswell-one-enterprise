import React from 'react';

export function WorkflowAssignmentCard({ snapshot }) {
  const assignments = snapshot?.assignments || [];

  return (
    <div className="identity-panel">
      <h2>Assignments</h2>
      <div className="permission-list">
        {assignments.length === 0 && <span>No assignments yet</span>}
        {assignments.map(item => (
          <span key={item.id}>{item.role || 'Assignee'} · {item.userId || item.teamId || 'Unassigned'} · {item.stageKey || 'Workflow'}</span>
        ))}
      </div>
    </div>
  );
}
