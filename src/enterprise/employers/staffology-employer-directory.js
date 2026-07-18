'use strict';
const { normalizeEmployer } = require('./employer-normalizer');
function unwrapCollection(payload) {
  if (Array.isArray(payload)) return payload;
  for (const key of ['items','data','results','employers']) {
    if (Array.isArray(payload?.[key])) return payload[key];
  }
  return [];
}
class StaffologyEmployerDirectory {
  constructor({ client } = {}) {
    if (!client?.get) throw new TypeError('Staffology client with get() is required');
    this.client = client;
  }
  async list() {
    const payload = await this.client.get('/employers');
    return unwrapCollection(payload).map(normalizeEmployer);
  }
  async get(employerId) {
    if (!employerId) throw new TypeError('Employer identifier is required');
    const employers = await this.list();
    const employer = employers.find((item) => item.id === String(employerId));
    if (!employer) {
      const error = new Error(`Employer ${employerId} was not found`);
      error.status = 404;
      error.code = 'EMPLOYER_NOT_FOUND';
      throw error;
    }
    return employer;
  }
}
module.exports = { StaffologyEmployerDirectory, unwrapCollection };
