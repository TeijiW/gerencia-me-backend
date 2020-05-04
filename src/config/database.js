require("dotenv/config")

const {
  DB_DIALECT = "postgres",
  DB_HOST = "localhost",
  DB_USER = "root",
  DB_PASSWORD = "default",
  DB_NAME = "gerencia_me",
  DATABASE_URL,
} = process.env

console.log(DATABASE_URL)

module.exports = {
  dialect: DB_DIALECT,
  host: DATABASE_URL,
  url: DATABASE_URL,
  define: {
    timestamp: true,
    underscored: true,
  },
}
