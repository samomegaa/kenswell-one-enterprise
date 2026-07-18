export function selectDraftDirty(state) {
  return Object.keys(state.changes).length > 0;
}

export function selectChangedCount(state) {
  return Object.keys(state.changes).length;
}

export function selectSectionChanged(
  state,
  sectionId
) {
  return Boolean(
    state.changedSections[sectionId]
  );
}

export function buildDraftPayload(
  state,
  employeeId
) {
  return Object.freeze({
    employeeId,
    changes: Object.freeze(
      Object.values(state.changes).map(
        (change) =>
          Object.freeze({
            fieldId: change.fieldId,
            providerBinding:
              change.providerBinding,
            value: change.currentValue,
          })
      )
    ),
  });
}
