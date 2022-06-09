const Provider = require("../models/provider.model");

module.exports = {
  async findAll(payload) {
    const { offset, limit, order } = payload;
    try {
      const { count, rows } = await Provider.findAndCountAll({
        limit: limit,
        offset: offset,
        order: order,
      });

      return { total: count, providers: rows };
    } catch (err) {
      throw "Erro ao obter fornecedores ( " + err + " ) ";
    }
  },
  async findById(provider_id) {
    try {
      const provider = await Provider.findByPk(provider_id);
      if (!provider) throw "Fornecedor não encontrado";
      return provider;
    } catch (err) {
      throw (
        "Erro ao procurar fornecedor com o id: " +
        provider_id +
        " ( " +
        err +
        " ) "
      );
    }
  },

  async create(payload) {
    const { name, email } = payload;

    try {
      const result = await Provider.sequelize.transaction(async (t) => {
        const provider = await Provider.create(
          {
            name,
            email,
          },
          { transaction: t }
        );
        const parsedProvider = provider.get({ plain: true });
        return { ...parsedProvider };
      });
      return result;
    } catch (err) {
      throw (
        "Erro ao criar fornecedor ( " + (err?.errors[0]?.message || err) + " ) "
      );
    }
  },
  async update(payload) {
    const { id, ...rest } = payload;

    try {
      const result = Provider.sequelize.transaction(async (t) => {
        const [rows, [provider]] = await Provider.update(
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
        if (!provider) throw "Fornecedor não encontrado";
        return provider;
      });
      return result;
    } catch (err) {
      throw (
        "Erro ao atualizar fornecedor com o id: " + id + " ( " + err + " ) "
      );
    }
  },
  async delete(id) {
    try {
      const result = await Provider.sequelize.transaction(async (t) => {
        const provider = await Provider.findOne({
          where: { id },
        });
        if (!provider) throw "Fornecedor não encontrado";
        await provider.destroy({ transaction: t });
        return provider;
      });
      return result;
    } catch (err) {
      throw "Erro ao eliminar fornecedor ( " + err + " )";
    }
  },
};
