const express = require("express")
const routes = require("./routes")
const middlewares = require("./config/middlewares")
require("./database")
require("dotenv/config")

console.log("start")
const app = express()
middlewares(app)
routes(app)

app.disable("etag")
app.use(express.json())

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log("Express server listening on port", port)
})
