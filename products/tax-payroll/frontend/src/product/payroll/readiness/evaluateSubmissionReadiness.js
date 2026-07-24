export function evaluateSubmissionReadiness({
  approval,
  compliance,
  fpsRequest,
  submission,
}) {
  if (submission?.status === 'accepted') {
    return result('already-submitted', false, 'Submission accepted');
  }

  if (approval?.status !== 'approved') {
    return result('blocked', false, 'Payroll approval required');
  }

  if (!compliance?.approvable) {
    return result('blocked', false, 'Compliance gate not satisfied');
  }

  if (!fpsRequest || fpsRequest.status !== 'prepared') {
    return result('requires-attention', false, 'FPS preparation required');
  }

  return result('ready', true, 'Ready for provider dispatch');
}

function result(status, dispatchable, reason) {
  return Object.freeze({ status, dispatchable, reason });
}
