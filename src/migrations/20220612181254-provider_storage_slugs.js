"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        "providers",
        "slug",
        {
          type: Sequelize.DataTypes.STRING,
          unique: true,
        },
        { transaction }
      );

      await queryInterface.changeColumn(
        "storages",
        "name",
        {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          unique: false,
        },
        { transaction }
      );
      await queryInterface.addColumn(
        "storages",
        "slug",
        {
          type: Sequelize.DataTypes.STRING,
          unique: true,
        },
        { transaction }
      );

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
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
