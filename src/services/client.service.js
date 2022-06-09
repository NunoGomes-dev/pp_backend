const Client = require("../models/client.model");

module.exports = {
  async findAll(payload) {
    const { offset, limit, order } = payload;
    try {
      const { count, rows } = await Client.findAndCountAll({
        limit: limit,
        offset: offset,
        order: order,
      });

      return { total: count, clients: rows };
    } catch (err) {
      throw "Erro ao obter clientes ( " + err + " ) ";
    }
  },
  async findById(client_id) {
    try {
      const client = await Client.findByPk(client_id);
      if (!client) throw "Cliente não encontrado";
      return client;
    } catch (err) {
      throw (
        "Erro ao procurar cliente com o id: " + client_id + " ( " + err + " ) "
      );
    }
  },

  async create({ name, email, contact, vat }) {
    try {
      const result = await Client.sequelize.transaction(async (t) => {
        const client = await Client.create(
          {
            name,
            email,
            contact,
            vat,
          },
          { transaction: t }
        );
        const parsedClient = client.get({ plain: true });
        return { ...parsedClient };
      });
      return result;
    } catch (err) {
      throw "Erro ao criar cliente ( " + err + " ) ";
    }
  },
  async update(payload) {
    const { id, ...rest } = payload;

    try {
      const result = Client.sequelize.transaction(async (t) => {
        const [rows, [client]] = await Client.update(
          {
            ...rest,
          },
          {
            where: {
              id,
            },
            returning: true,
          },
          {
            transaction: t,
          }
        );
        if (!client) throw "Cliente não encontrado";
        return client;
      });
      return result;
    } catch (err) {
      throw "Erro ao atualizar cliente com o id: " + id + " ( " + err + " ) ";
    }
  },
  async delete(id) {
    try {
      const result = await Client.sequelize.transaction(async (t) => {
        const client = await Client.findOne({
          where: { id },
        });
        if (!client) throw "Cliente não encontrado";
        await client.destroy({ transaction: t });
        return client;
      });
      return result;
    } catch (err) {
      throw "Erro ao eliminar cliente ( " + err + " )";
    }
  },
};
