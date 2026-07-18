export const DRAFT_ACTIONS = Object.freeze({
  RESET: 'workspace-draft/reset',
  CHANGE: 'workspace-draft/change',
  DISCARD: 'workspace-draft/discard',
});

export function resetDraft(employee) {
  return {
    type: DRAFT_ACTIONS.RESET,
    employee,
  };
}

export function changeDraftField(
  field,
  value,
  sectionId
) {
  return {
    type: DRAFT_ACTIONS.CHANGE,
    field,
    value,
    sectionId,
    changedAt: new Date().toISOString(),
  };
}

export function discardDraft() {
  return {
    type: DRAFT_ACTIONS.DISCARD,
  };
}
