"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.changeColumn("users", "email", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false,
    });
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.changeColumn("users", "email", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false,
    });
  },
};
