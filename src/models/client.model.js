const { Model, DataTypes } = require("sequelize");
const Order = require("./order.model");

class Client extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: { isEmail: true },
        },
        contact: DataTypes.STRING,
        vat: DataTypes.STRING,
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: "clients",
        modelName: "client",
      }
    );
  }
  static associate(models) {
    this.hasMany(models.order, {
      foreignKey: "id",
      as: "orders",
    });
  }
}

module.exports = Client;
