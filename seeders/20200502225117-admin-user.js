"use strict"

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "user",
      [
        {
          email: "admin@test.com",
          name: "admin",
          password: "admin",
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
