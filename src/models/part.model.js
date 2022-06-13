const { Model, DataTypes } = require("sequelize");
const { beforeCreate, beforeUpdate } = require("../hooks/part.hooks");

class Part extends Model {
  static init(sequelize) {
    super.init(
      {
        name: { type: DataTypes.STRING, allowNull: false },
        slug: { type: DataTypes.STRING, unique: true },
        ref: DataTypes.STRING,
        description: DataTypes.STRING,
        image: DataTypes.STRING,
        brand: DataTypes.STRING,
        stock: {
          type: DataTypes.INTEGER,
          validate: {
            min: 0,
          },
        },
        min_stock: {
          type: DataTypes.INTEGER,
          validate: {
            min: 0,
          },
        },
        cost: DataTypes.FLOAT,
        price: DataTypes.FLOAT,
        resale_price: DataTypes.FLOAT,
      },
      {
        sequelize,
        freezeTableName: true,
        modelName: "part",
        tableName: "parts",
        hooks: {
          beforeCreate: (part, options) => beforeCreate(part, options),
          beforeUpdate: (part, options) => beforeUpdate(part, options),
        },
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.provider, {
      foreignKey: "provider_id",
    });
    this.belongsTo(models.storage, {
      foreignKey: "storage_id",
    });
    this.belongsToMany(models.order, {
      through: { model: models.order_item },
      as: "orderItems",
    });
  }
}

module.exports = Part;
