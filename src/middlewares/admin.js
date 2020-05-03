const jwt = require("jsonwebtoken")
require("dotenv/config")

module.exports = (req, res, next) => {
  console.log(req.userEmail)
  console.log(process.env.ADMIN_EMAIL)
  if (req.userEmail === process.env.ADMIN_EMAIL) return next()
  return res.status(401).json({ error: "This operation is not allowed to you" })
}
