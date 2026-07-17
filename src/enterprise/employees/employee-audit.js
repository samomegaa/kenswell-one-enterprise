function createEmployeeAuditEvent({ employeeId, type, actorId = null, occurredAt = new Date().toISOString(), changes = {} }) {
  if (!employeeId || !type) throw new Error('Employee audit requires employeeId and type');
  return Object.freeze({ employeeId, type, actorId, occurredAt, changes: Object.freeze({ ...changes }) });
}
module.exports = { createEmployeeAuditEvent };
