export function publishPayrollEvent(adapter, eventName, payload) {
  adapter?.publishEvent?.(eventName, payload);
}

export function writePayrollAudit(adapter, action, payload) {
  adapter?.writeAudit?.({
    action,
    payload,
    recordedAt: new Date().toISOString(),
  });
}
