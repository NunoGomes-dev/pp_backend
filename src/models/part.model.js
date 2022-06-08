const { Model, DataTypes } = require("sequelize");

class Part extends Model {
  static init(sequelize) {
    super.init(
      {
        name: { type: DataTypes.STRING, allowNull: false },
        description: DataTypes.STRING,
        image: DataTypes.STRING,
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
        cost: { type: DataTypes.FLOAT, allowNull: false },
        price: { type: DataTypes.FLOAT, allowNull: false },
        resale_price: { type: DataTypes.FLOAT, allowNull: false },
      },
      {
        sequelize,
        freezeTableName: true,
        modelName: "part",
        tableName: "parts",
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.brand, {
      foreignKey: "brand_id",
    });
    this.belongsTo(models.provider, {
      foreignKey: "provider_id",
    });
    this.belongsTo(models.storage, {
      foreignKey: "storage_id",
    });
    this.belongsToMany(models.order, {
      through: { model: models.order_item },
      foreignKey: "part_id",
    });
  }
}

module.exports = Part;
