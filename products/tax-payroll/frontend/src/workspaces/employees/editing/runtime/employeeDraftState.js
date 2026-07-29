function clone(value) {
  return JSON.parse(JSON.stringify(value || {}));
}

export function createEmployeeDraft(employee) {
  const original = clone(employee);
  const draft = clone(employee);

  return Object.freeze({
    original: Object.freeze(original),
    draft,
    dirtyFields: Object.freeze([]),
    validationErrors: Object.freeze([]),
    pendingCommands: Object.freeze([]),
  });
}

export function updateEmployeeDraft(state, section, patch) {
  const nextDraft = clone(state.draft);
  nextDraft[section] = {
    ...(nextDraft[section] || {}),
    ...patch,
  };

  const dirtyFields = Object.keys(patch).map(
    (field) => `${section}.${field}`
  );

  return {
    ...state,
    draft: nextDraft,
    dirtyFields: Object.freeze([
      ...new Set([
        ...state.dirtyFields,
        ...dirtyFields,
      ]),
    ]),
  };
}

export function resetEmployeeDraft(state) {
  return createEmployeeDraft(state.original);
}
