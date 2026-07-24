import {
  activatePayrollSession,
} from './activatePayrollSession';

export function restorePayrollSession(
  storedSession,
  runtimeWorkspace
) {
  const employerId =
    runtimeWorkspace?.employer?.id;

  if (!employerId) {
    return null;
  }

  if (storedSession?.employerId === employerId) {
    return Object.freeze({
      ...storedSession,
      status: 'active',
      restored: true,
      runtimeWorkspace,
    });
  }

  return activatePayrollSession(runtimeWorkspace);
}
