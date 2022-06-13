const Part = require("../models/part.model");

module.exports = {
  async findAll(payload) {
    const { offset, limit, order } = payload;
    try {
      const { count, rows } = await Part.findAndCountAll({
        limit: limit,
        offset: offset,
        order: order,
      });

      return { total: count, parts: rows };
    } catch (err) {
      throw "Erro ao obter peças ( " + err + " ) ";
    }
  },
  async findById(part_id) {
    try {
      const part = await Part.findByPk(part_id, {
        include: ["provider", "storage"],
      });
      if (!part) throw "Peça não encontrada";

      return part;
    } catch (err) {
      throw "Erro ao procurar peça com o id: " + part_id + " ( " + err + " ) ";
    }
  },

  async create(payload) {
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
    } = payload;

    try {
      const result = await Part.sequelize.transaction(async (t) => {
        const part = await Part.create(
          {
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
          },
          {
            transaction: t,
          }
        );
        const parsedPart = part.get({ plain: true });
        return { ...parsedPart };
      });
      return result;
    } catch (err) {
      throw "Erro ao criar peça ( " + err + " ) ";
    }
  },
  async update(payload) {
    const { id, ...rest } = payload;

    try {
      const result = Part.sequelize.transaction(async (t) => {
        const [rows, [part]] = await Part.update(
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
        if (!part) throw "Peça não encontrada";
        return part;
      });
      return result;
    } catch (err) {
      throw "Erro ao atualizar a peça com o id: " + id + " ( " + err + " ) ";
    }
  },
  async delete(id) {
    try {
      const result = await Part.sequelize.transaction(async (t) => {
        const part = await Part.findOne({
          where: { id },
        });
        if (!part) throw "Peça não encontrada";
        await part.destroy({ transaction: t });
        return part;
      });
      return result;
    } catch (err) {
      throw "Erro ao eliminar peça ( " + err + " )";
    }
  },
};
