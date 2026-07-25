export function recordCommandActivity(
  adapter,
  eventName,
  payload
) {
  adapter?.publishEvent?.(eventName, payload);
  adapter?.writeAudit?.({
    action: eventName,
    payload,
    recordedAt: new Date().toISOString(),
  });
  adapter?.notify?.({
    type: eventName,
    payload,
    createdAt: new Date().toISOString(),
  });
}
