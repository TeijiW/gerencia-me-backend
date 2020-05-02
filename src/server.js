const express = require("express")
const routes = require("./routes")
const middlewares = require("./config/middlewares")
require("./database")
require("dotenv/config")

const app = express()
middlewares(app)
routes(app)

app.disable("etag")
app.use(express.json())

app.listen(process.env.APP_PORT)
