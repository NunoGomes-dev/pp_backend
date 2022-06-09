"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        "clients",
        "contact",
        {
          type: Sequelize.DataTypes.STRING,
        },
        { transaction }
      );
      await queryInterface.addColumn(
        "clients",
        "vat",
        {
          type: Sequelize.DataTypes.INTEGER,
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
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn("clients", "contact", { transaction });
      await queryInterface.removeColumn("clients", "vat", { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
