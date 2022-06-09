const { Model, DataTypes } = require("sequelize");

class Storage extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize,
        freezeTableName: true,
        modelName: "storage",
        tableName: "storages",
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

module.exports = Storage;
