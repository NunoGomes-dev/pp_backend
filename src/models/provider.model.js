const { Model, DataTypes } = require("sequelize");
const { beforeCreate, beforeUpdate } = require("../hooks/provider.hooks");

class Provider extends Model {
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

module.exports = Provider;
