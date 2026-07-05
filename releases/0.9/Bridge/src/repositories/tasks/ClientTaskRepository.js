const BaseRepository = require('../BaseRepository');

class ClientTaskRepository extends BaseRepository {
  constructor(models) {
    super(models.ClientTask);
  }

  findByClient(clientId, options = {}) {
    return this.findAll({ clientId }, options);
  }

  findByMatter(matterId, options = {}) {
    return this.findAll({ matterId }, options);
  }

  findOpenByClient(clientId, options = {}) {
    return this.findAll({ clientId, status: 'open' }, options);
  }

  findOverdueByClient(clientId, options = {}) {
    const { Op } = require('sequelize');

    return this.model.findAll({
      where: {
        clientId,
        status: ['open', 'in_progress'],
        dueAt: {
          [Op.lt]: new Date(),
        },
      },
      ...options,
    });
  }

  markCompleted(id, completedByAccountId, options = {}) {
    return this.update(id, {
      status: 'completed',
      completedByAccountId,
      completedAt: new Date(),
    }, options);
  }

  cancel(id, options = {}) {
    return this.update(id, {
      status: 'cancelled',
    }, options);
  }
}

module.exports = ClientTaskRepository;
