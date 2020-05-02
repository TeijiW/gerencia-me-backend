"use strict"

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("store", {
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
      address: {
        type: Sequelize.STRING(80),
        allowNull: true,
      },
      desc: {
        type: Sequelize.STRING(140),
        allowNull: false,
      },
      docNumber: {
        type: Sequelize.STRING(20),
        allowNull: true,
        field: "doc_number",
      },
      storeType: {
        type: Sequelize.ENUM(
          "food",
          "supermarket",
          "clothing",
          "drugstore",
          "building materials",
          "other"
        ),
        allowNull: false,
        field: "store_type",
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
    return queryInterface.dropTable("store")
  },
}
