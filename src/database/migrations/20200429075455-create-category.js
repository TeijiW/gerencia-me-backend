"use strict"

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("category", {
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
    return queryInterface.dropTable("category")
  },
}
