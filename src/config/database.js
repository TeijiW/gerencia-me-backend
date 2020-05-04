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
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  name: DB_NAME,
  protocol: DB_DIALECT,
  define: {
    timestamp: true,
    underscored: true,
  },
}
