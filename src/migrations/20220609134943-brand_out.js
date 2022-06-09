"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        "parts",
        "brand",
        {
          type: Sequelize.DataTypes.STRING,
        },
        { transaction }
      );

      await queryInterface.dropTable("brands", { transaction });

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
  async down(queryInterface, Sequelize) {},
};
