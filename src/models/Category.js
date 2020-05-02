const { Model, DataTypes } = require("sequelize")

class Category extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING(80),
      },
      {
        sequelize,
        underscored: true,
        freezeTableName: true,
        tableName: "category",
      }
    )
  }
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "userId", as: "user" })
    this.hasMany(models.Product, {
      foreignKey: "categoryId",
      as: "products",
    })
    this.belongsToMany(models.Store, {
      foreignKey: "categoryId",
      through: "store_categories",
      as: "stores",
    })
  }
}

module.exports = Category
