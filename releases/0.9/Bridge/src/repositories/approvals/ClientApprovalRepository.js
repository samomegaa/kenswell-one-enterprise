const BaseRepository = require('../BaseRepository');

class ClientApprovalRepository extends BaseRepository {
  constructor(models) {
    super(models.ClientApproval);
  }

  findByClient(clientId, options = {}) {
    return this.findAll({ clientId }, options);
  }

  findByMatter(matterId, options = {}) {
    return this.findAll({ matterId }, options);
  }

  findPendingByClient(clientId, options = {}) {
    return this.findAll({ clientId, status: 'pending' }, options);
  }

  approve(id, accountId, decisionNote = null, options = {}) {
    return this.update(id, {
      status: 'approved',
      decidedByAccountId: accountId,
      decidedAt: new Date(),
      decisionNote,
    }, options);
  }

  reject(id, accountId, decisionNote = null, options = {}) {
    return this.update(id, {
      status: 'rejected',
      decidedByAccountId: accountId,
      decidedAt: new Date(),
      decisionNote,
    }, options);
  }

  cancel(id, options = {}) {
    return this.update(id, {
      status: 'cancelled',
    }, options);
  }
}

module.exports = ClientApprovalRepository;
