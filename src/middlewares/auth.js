const jwt = require("jsonwebtoken")
require("dotenv/config")

module.exports = (req, res, next) => {
  const rawToken = req.headers["x-access-token"] || req.headers.authorization
  if (!rawToken) return res.status(401).json({ error: "No token provided" })
  const parts = rawToken.split(" ")
  if (!parts.lengt === 2) return res.status(401).json({ error: "Token Error" })

  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ error: "Is not a bearer token" })
  }

  jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
    if (error) return res.status(401).json({ error: "Invalid Token" })

    req.userId = decoded.id
    req.userEmail = decoded.email
    return next()
  })
}
