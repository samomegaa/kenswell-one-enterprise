import React from 'react';
import { WorkflowSummaryCard } from './WorkflowSummaryCard.jsx';
import { WorkflowStageTracker } from './WorkflowStageTracker.jsx';
import { WorkflowActionBar } from './WorkflowActionBar.jsx';
import { WorkflowAssignmentCard } from './WorkflowAssignmentCard.jsx';
import { WorkflowHistoryCard } from './WorkflowHistoryCard.jsx';

export function WorkflowWorkspace({ snapshot, onProgress, onBlock, onResume, onComplete }) {
  return (
    <div className="workspace-page">
      <div className="eyebrow">Release 0.8 · Orchestrator</div>
      <h1>Workflow Workspace</h1>
      <p>Manage workflow progress, ownership, blockers, and completion from one workspace.</p>

      <WorkflowSummaryCard snapshot={snapshot} />
      <WorkflowActionBar
        snapshot={snapshot}
        onProgress={onProgress}
        onBlock={onBlock}
        onResume={onResume}
        onComplete={onComplete}
      />
      <WorkflowStageTracker snapshot={snapshot} />
      <WorkflowAssignmentCard snapshot={snapshot} />
      <WorkflowHistoryCard snapshot={snapshot} />
    </div>
  );
}
