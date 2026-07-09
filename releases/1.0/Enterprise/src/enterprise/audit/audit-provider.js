const {
  recordActivity,
  queryActivity,
  clearActivityTrail,
} = require('./activity-trail');

class AuditProvider {
  record() {
    throw new Error('AuditProvider.record must be implemented');
  }

  query() {
    throw new Error('AuditProvider.query must be implemented');
  }

  health() {
    return {
      healthy: true,
      provider: this.constructor.name,
    };
  }

  shutdown() {
    return true;
  }
}

class MemoryAuditProvider extends AuditProvider {
  record(auditContext) {
    return recordActivity(auditContext);
  }

  query(predicate) {
    return queryActivity(predicate);
  }

  clear() {
    clearActivityTrail();
  }
}

const defaultAuditProvider = new MemoryAuditProvider();

module.exports = {
  AuditProvider,
  MemoryAuditProvider,
  defaultAuditProvider,
};
