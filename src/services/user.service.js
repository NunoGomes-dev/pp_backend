const User = require("../models/user.model");
const sequelize = require("sequelize");

module.exports = {
  async getAll() {
    try {
      const users = await User.findAll();
      return users;
    } catch (err) {
      throw "Error getting users ( " + err + " ) ";
    }
  },
  async createOne({ firstname, lastname, email, password, vat, phone }) {
    try {
      const result = await User.sequelize.transaction(async (t) => {
        const user = await User.create(
          {
            firstname,
            lastname,
            email,
            password,
            vat,
            phone,
          },
          { transaction: t }
        );
        const parsedUser = user.get({ plain: true });
        delete parsedUser["password"];
        return { ...parsedUser };
      });
      return result;
    } catch (err) {
      throw "Erro ao criar utilizador ( " + err + " ) ";
    }
  },
  async getByEmailWithPassword({ email }) {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) throw "Não encontrado";
      const userData = user.get({ plain: true });
      return { ...userData };
    } catch (error) {
      throw (
        "Erro ao obter utilizador com o email: " + email + " ( " + error + " ) "
      );
    }
  },
};
