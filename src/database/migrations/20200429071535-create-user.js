"use strict"

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("user", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(130),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(130),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(80),
        allowNull: false,
      },
      docNumber: {
        type: Sequelize.STRING(20),
        allowNull: true,
        field: "doc_number",
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
    return queryInterface.dropTable("user")
  },
}
