'use strict';
class EmployerCache {
  constructor({ ttlMilliseconds = 300000, clock = () => Date.now() } = {}) {
    this.ttlMilliseconds = ttlMilliseconds;
    this.clock = clock;
    this.value = null;
    this.expiresAt = 0;
  }
  get() {
    if (!this.value || this.clock() >= this.expiresAt) return null;
    return this.value;
  }
  set(value) {
    this.value = value;
    this.expiresAt = this.clock() + this.ttlMilliseconds;
    return value;
  }
  clear() { this.value = null; this.expiresAt = 0; }
}
module.exports = { EmployerCache };
