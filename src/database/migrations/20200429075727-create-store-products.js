"use strict"

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("store_products", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      storeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "store", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        field: "store_id",
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "product", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        field: "product_id",
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: "created_at",
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: "updated_at",
      },
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("store_products")
  },
}
