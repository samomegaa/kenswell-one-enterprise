import React from 'react';

export function WorkflowActionBar({ snapshot, onProgress, onBlock, onResume, onComplete }) {
  const workflow = snapshot?.workflow || snapshot;
  const disabled = !workflow?.id;

  return (
    <div className="identity-panel">
      <h2>Workflow Actions</h2>
      <div className="button-row">
        <button className="demo-button secondary" disabled={disabled} onClick={onProgress}>Progress</button>
        <button className="demo-button secondary" disabled={disabled} onClick={onBlock}>Block</button>
        <button className="demo-button secondary" disabled={disabled} onClick={onResume}>Resume</button>
        <button className="demo-button secondary" disabled={disabled} onClick={onComplete}>Complete</button>
      </div>
    </div>
  );
}
