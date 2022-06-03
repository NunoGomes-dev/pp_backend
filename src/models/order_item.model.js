const { Model, DataTypes } = require("sequelize");

class Order_Item extends Model {
  static init(sequelize) {
    super.init(
      {
        order_id: DataTypes.INTEGER,
        part_id: DataTypes.INTEGER,
        quantity: DataTypes.INTEGER,
        unit_price: DataTypes.FLOAT,
      },
      {
        sequelize,
        freezeTableName: true,
        modelName: "order_item",
        tableName: "order_items",
      }
    );
  }
}

module.exports = Order_Item;
