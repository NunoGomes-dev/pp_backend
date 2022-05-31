"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.changeColumn("users", "email", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
