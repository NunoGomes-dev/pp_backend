const { Model, DataTypes } = require("sequelize");
const { beforeCreate, beforeUpdate } = require("../hooks/storage.hooks");

class Storage extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        slug: {
          type: DataTypes.STRING,
          unique: true,
        },
      },
      {
        sequelize,
        freezeTableName: true,
        modelName: "storage",
        tableName: "storages",
        hooks: {
          beforeCreate: (s, o) => beforeCreate(s, o),
          beforeUpdate: (s, o) => beforeUpdate(s, o),
        },
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
