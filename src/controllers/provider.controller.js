const ProviderService = require("../services/provider.service");

module.exports = {
  async getAll(req, res) {
    const { page, limit, order, orderBy } = req.query;

    const orderArray = [];
    if (orderBy && order) {
      orderArray.push(orderBy);
      orderArray.push(order);
    }

    try {
      const { total, providers } = await ProviderService.findAll({
        offset: page ? parseInt(limit) * parseInt(page - 1) : undefined,
        limit: limit ? limit : undefined,
        order: orderArray.length > 0 ? [orderArray] : undefined,
      });

      return res.status(200).send({ total, providers });
    } catch (error) {
      return res.status(500).send({ error });
    }
  },
  async getById(req, res) {
    const { provider_id } = req.params;
    try {
      if (!provider_id)
        return res.status(500).send("id do fornecedor inválido");

      const provider = await ProviderService.findById(provider_id);
      return res.status(200).send(provider);
    } catch (error) {
      return res.status(500).send({ error });
    }
  },

  async create(req, res) {
    const { name, email } = req.body;

    if (!name) return res.status(500).send("Nome inválido");
    if (!email) return res.status(500).send("Email inválido");

    try {
      const provider = await ProviderService.create({
        name,
        email: email.toLowerCase(),
      });
      if (!provider) return res.status(500).send("Erro ao criar fornecedor");
      return res.status(200).send(provider);
    } catch (error) {
      return res.status(500).send({ error });
    }
  },
  async edit(req, res) {
    const { id, ...rest } = req.body;
    try {
      const provider = await ProviderService.update({
        id,
        ...rest,
      });
      const plainProvider = provider.get({ plain: true });

      return res.status(200).send({ ...plainProvider });
    } catch (error) {
      return res.status(500).send({ error });
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.body;
      if (!id) return res.status(500).send("id do fornecedor inválido");

      await ProviderService.delete(id);
      return res.status(200).send("apagado");
    } catch (error) {
      return res.status(500).send({ error });
    }
  },
};
