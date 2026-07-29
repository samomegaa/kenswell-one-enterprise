import {
  EMPLOYEE_EDIT_COMMANDS,
  validateEmployeeEdit,
} from './employeeEditingModel';

export function buildEmployeeEditCommand({
  employerId,
  employeeId,
  section,
  payload,
}) {
  const validation = validateEmployeeEdit({
    employerId,
    employeeId,
    section,
    payload,
  });

  if (!validation.valid) {
    throw new Error(validation.errors.join('; '));
  }

  return Object.freeze({
    type: EMPLOYEE_EDIT_COMMANDS[section],
    employerId,
    employeeId,
    payload: Object.freeze({ ...payload }),
    status: 'pending',
  });
}

export function stageEmployeeCommand(state, command) {
  return {
    ...state,
    pendingCommands: Object.freeze([
      ...state.pendingCommands,
      command,
    ]),
  };
}
