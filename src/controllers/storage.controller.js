const StorageService = require("../services/storage.service");

module.exports = {
  async getAll(req, res) {
    const { page, limit, order, orderBy } = req.query;

    const orderArray = [];
    if (orderBy && order) {
      orderArray.push(orderBy);
      orderArray.push(order);
    }

    try {
      const { total, storages } = await StorageService.findAll({
        offset: page ? parseInt(limit) * parseInt(page - 1) : undefined,
        limit: limit ? limit : undefined,
        order: orderArray.length > 0 ? [orderArray] : undefined,
      });

      return res.status(200).send({ total, storages });
    } catch (error) {
      return res.status(500).send({ error });
    }
  },
  async getById(req, res) {
    const { storage_id } = req.params;
    try {
      if (!storage_id) return res.status(500).send("id da gaveta inválido");

      const storage = await StorageService.findById(storage_id);
      return res.status(200).send(storage);
    } catch (error) {
      return res.status(500).send({ error });
    }
  },

  async create(req, res) {
    const { name } = req.body;

    if (!name) return res.status(500).send("Nome inválido");

    try {
      const storage = await StorageService.create({
        name,
      });
      if (!storage) return res.status(500).send("Erro ao criar gaveta");
      return res.status(200).send(storage);
    } catch (error) {
      return res.status(500).send({ error });
    }
  },
  async edit(req, res) {
    const { id, ...rest } = req.body;
    try {
      const storage = await StorageService.update({
        id,
        ...rest,
      });
      const plainStorage = storage.get({ plain: true });

      return res.status(200).send({ ...plainStorage });
    } catch (error) {
      return res.status(500).send({ error });
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.body;
      if (!id) return res.status(500).send("id da gaveta inválido");

      await StorageService.delete(id);
      return res.status(200).send("apagado");
    } catch (error) {
      return res.status(500).send({ error });
    }
  },
};
