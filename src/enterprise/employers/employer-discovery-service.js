'use strict';
class EmployerDiscoveryService {
  constructor({ directory, cache } = {}) {
    if (!directory?.list || !directory?.get) throw new TypeError('Employer directory is required');
    this.directory = directory;
    this.cache = cache;
  }
  async list({ refresh = false } = {}) {
    if (!refresh) {
      const cached = this.cache?.get();
      if (cached) return cached;
    }
    const employers = await this.directory.list();
    return this.cache ? this.cache.set(employers) : employers;
  }
  async get(employerId) {
    const employers = await this.list();
    const employer = employers.find((item) => item.id === String(employerId));
    return employer || this.directory.get(employerId);
  }
  clearCache() { this.cache?.clear(); }
}
module.exports = { EmployerDiscoveryService };
