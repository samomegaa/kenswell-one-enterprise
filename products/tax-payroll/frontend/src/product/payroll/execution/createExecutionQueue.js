export function createExecutionQueue(items = []) {
  return items.map((item, index) => Object.freeze({
    id: item.id || `payroll-job-${index + 1}`,
    type: item.type || 'calculation',
    payload: item.payload || {},
    status: 'queued',
  }));
}
