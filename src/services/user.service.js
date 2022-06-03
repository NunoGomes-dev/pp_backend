const User = require("../models/user.model");

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
      const user = await User.create({
        firstname,
        lastname,
        email,
        password,
        vat,
        phone,
      });
      return user;
    } catch (err) {
      throw "Error creating user ( " + err + " ) ";
    }
  },
};
