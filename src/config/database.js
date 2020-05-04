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
  host: DB_HOST,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  use_env_variable: "DATABASE_URL",
  define: {
    timestamp: true,
    underscored: true,
  },
}
