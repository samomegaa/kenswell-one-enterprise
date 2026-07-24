export function publishGovernanceEvent(
  adapter,
  eventName,
  payload
) {
  adapter?.publishEvent?.(eventName, payload);
}

export function writeGovernanceAudit(
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
