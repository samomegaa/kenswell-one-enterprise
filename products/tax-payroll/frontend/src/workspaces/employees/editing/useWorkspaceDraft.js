import {
  useEffect,
  useMemo,
  useReducer,
} from 'react';

import workspaceDraftReducer, {
  createDraftState,
} from './workspaceDraftReducer';

import {
  changeDraftField,
  discardDraft,
  resetDraft,
} from './workspaceDraftActions';

import {
  buildDraftPayload,
  selectChangedCount,
  selectDraftDirty,
} from './workspaceDraftSelectors';

export default function useWorkspaceDraft(
  employee
) {
  const [state, dispatch] = useReducer(
    workspaceDraftReducer,
    employee,
    createDraftState
  );

  useEffect(() => {
    dispatch(resetDraft(employee));
  }, [employee]);

  return useMemo(
    () => ({
      state,
      values: state.values,
      changes: state.changes,
      changedSections:
        state.changedSections,
      dirty: selectDraftDirty(state),
      changedCount:
        selectChangedCount(state),
      changeField: (
        field,
        value,
        sectionId
      ) =>
        dispatch(
          changeDraftField(
            field,
            value,
            sectionId
          )
        ),
      discard: () =>
        dispatch(discardDraft()),
      buildPayload: (employeeId) =>
        buildDraftPayload(
          state,
          employeeId
        ),
    }),
    [state]
  );
}
