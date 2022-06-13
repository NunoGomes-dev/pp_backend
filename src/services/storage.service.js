const Storage = require("../models/storage.model");

module.exports = {
  async findAll(payload) {
    const { offset, limit, order } = payload;
    try {
      const { count, rows } = await Storage.findAndCountAll({
        limit: limit,
        offset: offset,
        order: order,
      });

      return { total: count, storages: rows };
    } catch (err) {
      throw "Erro ao obter gavetas ( " + err + " ) ";
    }
  },
  async findById(storage_id) {
    try {
      const storage = await Storage.findByPk(storage_id);
      if (!storage) throw "Gaveta não encontrada";
      return storage;
    } catch (err) {
      throw (
        "Erro ao procurar gaveta com o id: " + storage_id + " ( " + err + " ) "
      );
    }
  },

  async create(payload) {
    const { name } = payload;

    try {
      const result = await Storage.sequelize.transaction(async (t) => {
        const storage = await Storage.create(
          {
            name,
          },
          { transaction: t }
        );
        const parsedStorage = storage.get({ plain: true });
        return { ...parsedStorage };
      });
      return result;
    } catch (err) {
      throw (
        "Erro ao criar gaveta ( " + (err?.errors[0]?.message || err) + " ) "
      );
    }
  },
  async update(payload) {
    const { id, ...rest } = payload;

    try {
      const result = Storage.sequelize.transaction(async (t) => {
        const [rows, [storage]] = await Storage.update(
          {
            ...rest,
          },
          {
            where: {
              id,
            },
            returning: true,
            individualHooks: true,
          },
          {
            transaction: t,
          }
        );
        if (!storage) throw "Gaveta não encontrada";
        return storage;
      });
      return result;
    } catch (err) {
      throw "Erro ao atualizar gaveta com o id: " + id + " ( " + err + " ) ";
    }
  },
  async delete(id) {
    try {
      const result = await Storage.sequelize.transaction(async (t) => {
        const storage = await Storage.findOne({
          where: { id },
        });
        if (!storage) throw "Gaveta não encontrada";
        await storage.destroy({ transaction: t });
        return storage;
      });
      return result;
    } catch (err) {
      throw "Erro ao eliminar gaveta ( " + err + " )";
    }
  },
};
