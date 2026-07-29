import {
  useCallback,
  useMemo,
  useState,
} from 'react';

import {
  createEmployeeDraft,
  resetEmployeeDraft,
  updateEmployeeDraft,
} from './employeeDraftState';

import {
  buildEmployeeEditCommand,
  stageEmployeeCommand,
} from './employeeCommandPipeline';

export function useEmployeeEditingRuntime({
  employee,
  employerId,
}) {
  const [state, setState] = useState(
    () => createEmployeeDraft(employee)
  );

  const updateSection = useCallback(
    (section, patch) => {
      setState((current) =>
        updateEmployeeDraft(current, section, patch)
      );
    },
    []
  );

  const stageSection = useCallback(
    (section) => {
      setState((current) => {
        const command = buildEmployeeEditCommand({
          employerId,
          employeeId: current.draft.id,
          section,
          payload: current.draft[section] || {},
        });

        return stageEmployeeCommand(
          current,
          command
        );
      });
    },
    [employerId]
  );

  const reset = useCallback(() => {
    setState((current) =>
      resetEmployeeDraft(current)
    );
  }, []);

  const canSubmit = useMemo(
    () =>
      state.dirtyFields.length > 0 &&
      state.validationErrors.length === 0,
    [state]
  );

  return {
    ...state,
    canSubmit,
    updateSection,
    stageSection,
    reset,
  };
}
