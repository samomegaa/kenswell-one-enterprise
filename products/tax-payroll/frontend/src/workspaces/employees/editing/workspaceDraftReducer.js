import {
  DRAFT_ACTIONS,
} from './workspaceDraftActions';

import {
  getPathValue,
  setPathValue,
} from './workspaceDraftValues';

export function createDraftState(employee) {
  return {
    original: employee,
    values: employee,
    changes: {},
    changedSections: {},
  };
}

export default function workspaceDraftReducer(
  state,
  action
) {
  if (action.type === DRAFT_ACTIONS.RESET) {
    return createDraftState(action.employee);
  }

  if (action.type === DRAFT_ACTIONS.DISCARD) {
    return createDraftState(state.original);
  }

  if (action.type !== DRAFT_ACTIONS.CHANGE) {
    return state;
  }

  const path = action.field.providerBinding;
  const originalValue = getPathValue(
    state.original,
    path
  );

  const unchanged =
    Object.is(originalValue, action.value);

  const changes = { ...state.changes };
  const changedSections = {
    ...state.changedSections,
  };

  if (unchanged) {
    delete changes[action.field.id];
  } else {
    changes[action.field.id] = {
      fieldId: action.field.id,
      providerBinding: path,
      sectionId: action.sectionId,
      originalValue,
      currentValue: action.value,
      changedAt: action.changedAt,
    };
  }

  changedSections[action.sectionId] =
    Object.values(changes).some(
      (change) =>
        change.sectionId === action.sectionId
    );

  return {
    ...state,
    values: setPathValue(
      state.values,
      path,
      action.value
    ),
    changes,
    changedSections,
  };
}
