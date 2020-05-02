require("dotenv/config")

const { DB_DIALECT, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env

module.exports = {
  dialect: DB_DIALECT ? DB_DIALECT : "mysql",
  host: DB_HOST ? DB_HOST : "localhost",
  username: DB_USER ? DB_USER : "root",
  password: DB_PASSWORD ? DB_PASSWORD : "default",
  database: DB_NAME ? DB_NAME : "gerencia_me",
  define: {
    timestamp: true,
    underscored: true,
  },
}
