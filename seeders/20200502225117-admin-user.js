"use strict"
require("dotenv/config")

const { ADMIN_EMAIL = "admin@test.com", ADMIN_PASSWORD = "admin" } = process.env

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "user",
      [
        {
          email: ADMIN_EMAIL,
          name: admin,
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
