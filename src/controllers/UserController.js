const User = require("../models/User")

const index = async (req, res) => {
  const users = await User.findAll()
  return res.json(users)
}

const getById = async (req, res) => {
  const userId = Number(req.params.userId)
  const user = await User.findByPk(userId)
  if (!user) return res.status(404).json({ error: "Not Found" })
  return res.json(user)
}

const create = async (req, res) => {
  const { email, name, password, docNumber } = req.body

  try {
    const user = await User.create({
      email,
      name,
      password,
      docNumber,
    })
    return res.status(201).json(user)
  } catch (error) {
    if (error instanceof Sequelize.DatabaseError) {
      return res.status(400).json({ error: "Invalid Request" })
    }
    return res.status(500).end()
  }
}

const update = async (req, res) => {
  const userId = Number(req.params.userId)
  const { email, name, password, docNumber } = req.body
  const id = Number(req.body.id)
  const userToUpdate = {
    id,
    email,
    name,
    password,
    docNumber,
  }

  if (userId !== id)
    return res.status(400).json({
      error: "request user and user at request body do not match",
    })

  const user = await User.findByPk(userId)
  if (!user) return res.status(404).json({ error: "Not Found" })

  await User.update(userToUpdate, {
    where: { id },
  })
  return res.end()
}

const remove = async (req, res) => {
  const userId = Number(req.params.userId)
  try {
    await User.destroy({
      where: {
        id: userId,
      },
    })
    return res.end()
  } catch (error) {
    return res.status(500).end()
  }
}

module.exports = {
  index,
  getById,
  create,
  update,
  remove,
}
