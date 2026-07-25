export function evaluateSla(snapshot, policy) {
  const submission = snapshot?.submission;
  const waitingSince = submission?.updatedAt;

  if (!waitingSince || submission?.status !== 'pending') {
    return Object.freeze({
      breached: false,
      elapsedMinutes: 0,
      thresholdMinutes: policy.submissionResponseMinutes,
    });
  }

  const elapsedMinutes = Math.floor(
    (Date.now() - new Date(waitingSince).getTime()) / 60000
  );

  return Object.freeze({
    breached: elapsedMinutes > policy.submissionResponseMinutes,
    elapsedMinutes,
    thresholdMinutes: policy.submissionResponseMinutes,
  });
}
