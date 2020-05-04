const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/User")
require("dotenv/config")

const auth = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ where: { email }, raw: true })
  if (!user) return res.status(404).json({ error: "User not found" })
  const databasePassword = user.password
  try {
    if (!password || !databasePassword) {
      return res.status(400).json({ error: "Password cannot be null" })
    }
    const equals = await bcrypt.compare(password, databasePassword)
    if (!equals) return res.status(403).end()
    delete user.password
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.SECRET_KEY,
      {
        expiresIn: 86400,
      }
    )
    res.json({ user, token, expires: Date.now() + 86400 * 1000 })
  } catch (error) {
    console.log(error)
    return res.status(500).end()
  }
}

module.exports = {
  auth,
}
