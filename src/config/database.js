require("dotenv/config")

const {
  DB_DIALECT = "postgres",
  DB_HOST = "localhost",
  DB_USER = "root",
  DB_PASSWORD = "default",
  DB_NAME = "gerencia_me",
} = process.env

module.exports = {
  dialect: DB_DIALECT,
  url: DB_HOST,
  define: {
    timestamp: true,
    underscored: true,
  },
}
