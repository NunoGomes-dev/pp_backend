require("dotenv/config");

const UserService = require("../services/user.service");

module.exports = {
  async list(req, res) {
    try {
      console.log("controller");
      const users = await UserService.getAll();
      return res.status(200).send(users);
    } catch (err) {
      return res.status(500).send({ err });
    }
  },
  async register(req, res) {
    const { firstname, lastname, email, password, vat, phone } = req.body;

    try {
      const user = await UserService.createOne({
        firstname,
        lastname,
        email,
        password,
        vat,
        phone,
      });
      return res.status(200).send(user);
    } catch (err) {
      return res.status(500).send({ err });
    }
  },
};
