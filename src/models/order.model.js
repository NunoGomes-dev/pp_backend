const { Model, DataTypes } = require("sequelize");

class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        type: {
          type: DataTypes.ENUM("revenda", "final"),
          allowNull: false,
        },
        observations: DataTypes.TEXT,
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: "orders",
        modelName: "order",
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.client, { foreignKey: "client_id" });
    this.belongsToMany(models.part, {
      through: { model: models.order_item },
      foreignKey: "order_id",
    });
  }
}

module.exports = Order;
