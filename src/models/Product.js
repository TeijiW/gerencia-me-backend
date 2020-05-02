const { Model, DataTypes } = require("sequelize")

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING(80),
        desc: DataTypes.STRING(140),
        imageUrl: DataTypes.STRING(140),
        price: DataTypes.DECIMAL(10, 2),
      },
      {
        sequelize,
        underscored: true,
        freezeTableName: true,
        tableName: "product",
      }
    )
  }
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "userId", as: "user" })
    this.belongsTo(models.Category, {
      foreignKey: "categoryId",
      as: "category",
    })
    this.belongsToMany(models.Store, {
      foreignKey: "productId",
      through: "store_products",
      as: "stores",
    })
  }
}

module.exports = Product
