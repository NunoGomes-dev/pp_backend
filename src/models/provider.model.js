const { Model, DataTypes } = require("sequelize");

class Provider extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        freezeTableName: true,
        modelName: "provider",
        tableName: "providers",
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

module.exports = Provider;
