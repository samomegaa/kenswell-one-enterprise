const BaseRepository = require('../BaseRepository');

class ClientRepository extends BaseRepository {
  constructor(models) {
    super(models.Client);
  }

  findByFirm(firmId, options = {}) {
    return this.findAll({ firmId }, options);
  }

  findByEmail(firmId, email, options = {}) {
    return this.findOne({
      firmId,
      email: String(email).toLowerCase(),
    }, options);
  }

  findByReference(firmId, reference, options = {}) {
    return this.findOne({ firmId, reference }, options);
  }

  searchByName(firmId, searchTerm, options = {}) {
    const { Op } = require('sequelize');

    return this.model.findAll({
      where: {
        firmId,
        displayName: {
          [Op.iLike]: `%${searchTerm}%`,
        },
      },
      order: [['displayName', 'ASC']],
      ...options,
    });
  }
}

module.exports = ClientRepository;
