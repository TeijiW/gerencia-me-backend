"use strict"

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("product", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(80),
        allowNull: false,
      },
      desc: {
        type: Sequelize.STRING(140),
        allowNull: false,
      },
      imageURL: {
        type: Sequelize.STRING(140),
        allowNull: true,
        field: "image_url",
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "category", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        field: "category_id",
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "user", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        field: "user_id",
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
    return queryInterface.dropTable("product")
  },
}
