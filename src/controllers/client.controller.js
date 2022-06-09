const ClientService = require("../services/client.service");

module.exports = {
  async getAll(req, res) {
    const { page, limit, order, orderBy } = req.query;

    const orderArray = [];
    if (orderBy && order) {
      orderArray.push(orderBy);
      orderArray.push(order);
    }

    try {
      const { total, clients } = await ClientService.findAll({
        offset: page ? parseInt(limit) * parseInt(page - 1) : undefined,
        limit: limit ? limit : undefined,
        order: orderArray.length > 0 ? [orderArray] : undefined,
      });

      return res.status(200).send({ total, clients });
    } catch (error) {
      return res.status(500).send({ error });
    }
  },
  async getById(req, res) {
    const { client_id } = req.params;
    try {
      if (!client_id)
        return res.status(500).send("Identificador do cliente inválido");

      const client = await ClientService.findById(client_id);
      return res.status(200).send(client);
    } catch (error) {
      return res.status(500).send({ error });
    }
  },

  async create(req, res) {
    const { name, email, contact, vat } = req.body;

    if (!name) return res.status(500).send("Nome inválido");
    if (!email) return res.status(500).send("Eamil inválido");

    try {
      const client = await ClientService.create({
        name,
        email: email.toLowerCase(),
        contact,
        vat,
      });
      if (!client) return res.status(500).send("Erro ao criar cliente");
      return res.status(200).send(client);
    } catch (error) {
      return res.status(500).send({ error });
    }
  },
  async edit(req, res) {
    const { id, ...rest } = req.body;
    try {
      const client = await ClientService.update({
        id,
        ...rest,
      });
      const plainClient = client.get({ plain: true });

      return res.status(200).send({ ...plainClient });
    } catch (error) {
      return res.status(500).send({ error });
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.body;
      if (!id) return res.status(500).send("id do cliente inválido");

      await ClientService.delete(id);
      return res.status(200).send("deleted");
    } catch (error) {
      return res.status(500).send({ error });
    }
  },
};
