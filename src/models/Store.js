const { Model, DataTypes } = require("sequelize")

class Store extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING(80),
        address: DataTypes.STRING(80),
        desc: DataTypes.STRING(140),
        docNumber: DataTypes.STRING(20),
        storeType: DataTypes.ENUM(
          "food",
          "supermakert",
          "clothing",
          "drugstore",
          "building materials",
          "other"
        ),
      },
      {
        sequelize,
        underscored: true,
        freezeTableName: true,
        tableName: "store",
      }
    )
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "userId", as: "user" })
    this.belongsToMany(models.Product, {
      foreignKey: "storeId",
      through: "store_products",
      as: "products",
    })
    this.belongsToMany(models.Category, {
      foreignKey: "storeId",
      through: "store_categories",
      as: "categories",
    })
  }
}

module.exports = Store
