export function publishPipelineEvent(adapter, eventName, payload) {
  adapter?.publishEvent?.(eventName, payload);
}
export function writePipelineAudit(adapter, action, payload) {
  adapter?.writeAudit?.({ action, payload, recordedAt: new Date().toISOString() });
}
