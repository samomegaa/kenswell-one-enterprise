import React from 'react';

function formatStage(stage) {
  return stage?.title || stage?.name || stage?.key || 'Stage';
}

export function WorkflowStageTracker({ snapshot }) {
  const stages = snapshot?.stages || snapshot?.workflow?.stages || [];
  const currentStage = snapshot?.currentStage || null;

  return (
    <div className="identity-panel">
      <h2>Stage Tracker</h2>
      <div className="permission-list">
        {stages.length === 0 && <span>No stages available</span>}
        {stages.map(stage => (
          <span key={stage.id || stage.key}>
            {currentStage?.id === stage.id || currentStage?.key === stage.key ? '▶ ' : ''}
            {formatStage(stage)} · {stage.status || 'PENDING'}
          </span>
        ))}
      </div>
    </div>
  );
}
