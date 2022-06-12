const PartService = require("../services/part.service");

module.exports = {
  async getAll(req, res) {
    const { page, limit, order, orderBy } = req.query;

    const orderArray = [];
    if (orderBy && order) {
      orderArray.push(orderBy);
      orderArray.push(order);
    }

    try {
      const { total, parts } = await PartService.findAll({
        offset: page ? parseInt(limit) * parseInt(page - 1) : undefined,
        limit: limit ? limit : undefined,
        order: orderArray.length > 0 ? [orderArray] : undefined,
      });

      return res.status(200).send({ total, parts });
    } catch (error) {
      return res.status(500).send({ error });
    }
  },
  async getById(req, res) {
    const { part_id } = req.params;

    try {
      if (!part_id) return res.status(500).send("id da peça inválido");

      const part = await PartService.findById(part_id);
      return res.status(200).send(part);
    } catch (error) {
      return res.status(500).send({ error });
    }
  },

  async create(req, res) {
    const {
      name,
      ref,
      description,
      image,
      brand,
      stock,
      min_stock,
      cost,
      price,
      resale_price,
      provider_id,
      storage_id,
    } = req.body;

    if (!name) return res.status(500).send("Nome da peça inválido");

    try {
      const part = await PartService.create({
        name,
        ref,
        description,
        image,
        brand,
        stock,
        min_stock,
        cost,
        price,
        resale_price,
        provider_id,
        storage_id,
      });
      return res.status(200).send(part);
    } catch (error) {
      return res.status(500).send({ error });
    }
  },
  async update(req, res) {
    const { id, ...rest } = req.body;
    try {
      const part = await PartService.update({
        id,
        ...rest,
      });
      const plainPart = part.get({ plain: true });

      return res.status(200).send({ ...plainPart });
    } catch (error) {
      return res.status(500).send({ error });
    }
  },
  async delete(req, res) {
    const { id } = req.body;
    if (!id) return res.status(500).send("id da peça inválido");

    try {
      await PartService.delete(id);
      return res.status(200).send("apagado");
    } catch (error) {
      return res.status(500).send({ error });
    }
  },
};
