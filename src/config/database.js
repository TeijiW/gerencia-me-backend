require("dotenv/config")

const {
  DB_DIALECT = "sqlite",
  DB_HOST = "localhost",
  DB_USER = "root",
  DB_PASSWORD = "default",
  DB_NAME = "gerencia_me",
} = process.env

module.exports = {
  dialect: "sqlite",
  storage: "./database.sqlite",
  database: DB_NAME,
  define: {
    timestamp: true,
    underscored: true,
  },
}
