const { Model, DataTypes } = require("sequelize");

class Brand extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        part_id: DataTypes.INTEGER,
      },
      {
        sequelize,
        freezeTableName: true,
        modelName: "brand",
        tableName: "brands",
      }
    );
  }
  static associate(models) {
    this.hasMany(models.part, {
      foreignKey: "part_id",
      as: "parts",
    });
  }
}

module.exports = Brand;
