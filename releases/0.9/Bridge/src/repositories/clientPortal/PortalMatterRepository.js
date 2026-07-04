const BaseRepository = require('../BaseRepository');

class PortalMatterRepository extends BaseRepository {
  constructor(models) {
    super(models.PortalMatter);
  }

  findByClientId(clientId, options = {}) {
    return this.findAll({ clientId }, options);
  }

  findByMatterId(matterId, options = {}) {
    return this.findOne({ matterId }, options);
  }

  findOpenByClientId(clientId, options = {}) {
    return this.findAll({
      clientId,
      status: 'open',
    }, options);
  }

  findByFirm(firmId, options = {}) {
    return this.findAll({ firmId }, options);
  }
}

module.exports = PortalMatterRepository;
