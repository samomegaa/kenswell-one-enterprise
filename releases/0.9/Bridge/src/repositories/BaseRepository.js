class BaseRepository {
  constructor(model) {
    if (!model) {
      throw new Error('Repository requires a Sequelize model');
    }

    this.model = model;
  }

  async create(data, options = {}) {
    return this.model.create(data, options);
  }

  async findById(id, options = {}) {
    return this.model.findByPk(id, options);
  }

  async findOne(where = {}, options = {}) {
    return this.model.findOne({ where, ...options });
  }

  async findAll(where = {}, options = {}) {
    return this.model.findAll({ where, ...options });
  }

  async update(id, data, options = {}) {
    const record = await this.findById(id, options);

    if (!record) {
      return null;
    }

    return record.update(data, options);
  }

  async delete(id, options = {}) {
    const record = await this.findById(id, options);

    if (!record) {
      return false;
    }

    await record.destroy(options);
    return true;
  }

  async paginate(where = {}, { page = 1, limit = 25, order = [['createdAt', 'DESC']], ...options } = {}) {
    const safePage = Math.max(Number(page) || 1, 1);
    const safeLimit = Math.min(Math.max(Number(limit) || 25, 1), 100);
    const offset = (safePage - 1) * safeLimit;

    const { rows, count } = await this.model.findAndCountAll({
      where,
      limit: safeLimit,
      offset,
      order,
      ...options,
    });

    return {
      data: rows,
      pagination: {
        page: safePage,
        limit: safeLimit,
        total: count,
        totalPages: Math.ceil(count / safeLimit),
      },
    };
  }
}

module.exports = BaseRepository;
