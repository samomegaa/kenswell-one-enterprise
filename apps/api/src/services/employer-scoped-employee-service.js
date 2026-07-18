'use strict';
function unwrapCollection(payload) {
  if (Array.isArray(payload)) return payload;
  for (const key of ['items','data','results','employees']) {
    if (Array.isArray(payload?.[key])) return payload[key];
  }
  return [];
}
class EmployerScopedEmployeeService {
  constructor({ client, mapEmployee } = {}) {
    if (!client?.get) throw new TypeError('Staffology client with get() is required');
    this.client = client;
    this.mapEmployee = typeof mapEmployee === 'function' ? mapEmployee : (value) => value;
  }
  async list(employerId) {
    this.requireEmployerId(employerId);
    const payload = await this.client.get(`/employers/${encodeURIComponent(employerId)}/employees`);
    return unwrapCollection(payload).map((employee) => this.mapEmployee(employee,{ employerId }));
  }
  async get(employerId, employeeId) {
    this.requireEmployerId(employerId);
    if (!employeeId) throw new TypeError('Employee identifier is required');
    const payload = await this.client.get(`/employers/${encodeURIComponent(employerId)}/employees/${encodeURIComponent(employeeId)}`);
    return this.mapEmployee(payload?.data || payload,{ employerId });
  }
  requireEmployerId(employerId) {
    if (!employerId) throw new TypeError('Employer identifier is required');
  }
}
module.exports = { EmployerScopedEmployeeService, unwrapCollection };
