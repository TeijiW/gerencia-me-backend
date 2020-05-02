"use strict"
require("dotenv/config")

const { ADMIN_USER = "admin", ADMIN_PASSWORD = "admin" } = process.env

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "user",
      [
        {
          email: "admin@test.com",
          name: ADMIN_USER,
          password: ADMIN_PASSWORD,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("user", null, {})
  },
}
