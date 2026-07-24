export function publishSubmissionEvent(
  adapter,
  eventName,
  payload
) {
  adapter?.publishEvent?.(eventName, payload);
}

export function writeSubmissionAudit(
  adapter,
  action,
  payload
) {
  adapter?.writeAudit?.({
    action,
    payload,
    recordedAt: new Date().toISOString(),
  });
}
