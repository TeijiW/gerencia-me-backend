const { Model, DataTypes } = require("sequelize")

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        email: DataTypes.STRING(130),
        name: DataTypes.STRING(130),
        password: DataTypes.STRING(80),
        docNumber: DataTypes.STRING(20),
      },
      {
        sequelize,
        underscored: true,
        freezeTableName: true,
        tableName: "user",
      }
    )
  }
  static associate(models) {
    this.hasMany(models.Store, { foreignKey: "userId", as: "stores" })
    this.hasMany(models.Category, { foreignKey: "userId", as: "categories" })
    this.hasMany(models.Product, { foreignKey: "userId", as: "products" })
  }
}

module.exports = User
