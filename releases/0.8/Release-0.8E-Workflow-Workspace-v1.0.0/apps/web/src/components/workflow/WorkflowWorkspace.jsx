import React from 'react';

export function WorkflowWorkspace({ snapshot, onBlock, onResume, onComplete }) {
  if (!snapshot) {
    return (
      <div className="identity-panel">
        <h2>Workflow Detail</h2>
        <p>Select a workflow from the queue.</p>
      </div>
    );
  }

  const workflow = snapshot.workflow;
  const stages = snapshot.stages || [];
  const currentStage = snapshot.currentStage;

  return (
    <div className="identity-panel">
      <div className="eyebrow">Workflow Snapshot</div>
      <h2>{workflow.title}</h2>
      <p>{workflow.status} · {workflow.workflowKey}</p>

      <div className="action-row">
        <button className="demo-button" onClick={onBlock}>Block</button>
        <button className="demo-button" onClick={onResume}>Resume</button>
        <button className="demo-button" onClick={onComplete}>Complete</button>
      </div>

      <h3>Current Stage</h3>
      <div className="result-box">
        <strong>{currentStage?.title || 'No active stage'}</strong>
        <p>{currentStage?.status || workflow.status}</p>
      </div>

      <h3>Stages</h3>
      <div className="role-grid">
        {stages.map(stage => (
          <div className="client-card" key={stage.id}>
            <span>{stage.status}</span>
            <strong>{stage.title}</strong>
            <small>{stage.key}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
