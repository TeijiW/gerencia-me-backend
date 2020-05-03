const jwt = require("jsonwebtoken")
require("dotenv/config")

module.exports = (req, res, next) => {
  if (req.userEmail === process.env.ADMIN_EMAIL) return next()
  return res.status(401).json({ error: "This operation is not allowed to you" })
}
