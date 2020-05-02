"use strict"

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("store_categories", {
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
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "category", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        field: "category_id",
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
    return queryInterface.dropTable("store_categories")
  },
}
