"use strict"
const bcrypt = require("bcrypt")
require("dotenv/config")

const { ADMIN_EMAIL = "admin@test.com", ADMIN_PASSWORD = "admin" } = process.env

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "user",
      [
        {
          email: ADMIN_EMAIL,
          name: "admin",
          password: bcrypt.hashSync(ADMIN_PASSWORD, 10),
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
