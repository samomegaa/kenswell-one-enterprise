export function createSubmissionIdempotencyKey(fpsRequest) {
  if (!fpsRequest?.employerId || !fpsRequest?.periodId) {
    return null;
  }

  return [
    'fps',
    fpsRequest.employerId,
    fpsRequest.periodId,
  ].join(':');
}
