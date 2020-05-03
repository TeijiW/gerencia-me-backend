const Sequelize = require("sequelize")
const Store = require("../models/Store")
const User = require("../models/User")

const indexByUser = async (req, res) => {
  const userId = Number(req.userId)

  try {
    const user = await User.findByPk(userId)
    if (!user) return res.status(404).json({ error: "User not found" })
    stores = await Store.findAll({ where: { userId } })
    return res.json(stores)
  } catch (error) {
    return res.status(500).end()
  }
}

const create = async (req, res) => {
  const userIdParam = Number(req.userId)
  const { name, address, desc, docNumber, storeType, userId } = req.body

  if (Number(userId) !== userIdParam)
    return res.status(400).json({
      error: "request user and user at request body do not match",
    })

  const user = await User.findByPk(userId)
  if (!user) return res.status(404).json({ error: "User not found" })

  try {
    const store = await Store.create({
      name,
      address,
      desc,
      docNumber,
      storeType,
      userId,
    })

    return res.status(201).json(store)
  } catch (error) {
    if (error instanceof Sequelize.DatabaseError) {
      return res.status(400).json({ error: "Invalid Request" })
    }
    return res.status(500).end()
  }
}

const update = async (req, res) => {
  const userIdParam = Number(req.userId)
  const storeIdParam = Number(req.params.storeId)
  const { name, address, desc, docNumber, storeType } = req.body
  const id = Number(req.body.id)
  const userId = Number(req.body.userId)
  const storeToUpdate = {
    id,
    name,
    address,
    desc,
    docNumber,
    storeType,
    userId,
  }
  if (userIdParam !== userId || storeIdParam !== id)
    return res.status(400).json({
      error: "userID or storeID in the parameters and in the body do not match",
    })

  const user = await User.findByPk(userIdParam)
  const store = await Store.findByPk(storeIdParam)
  if (!user || !store) return res.status(404).json({ error: "Not Found" })
  try {
    await Store.update(storeToUpdate, {
      where: { id },
    })
    return res.end()
  } catch (error) {
    console.log(error)
    return res.status(500).end()
  }
}

const remove = async (req, res) => {
  const storeId = Number(req.params.storeId)
  const userId = Number(req.userId)
  try {
    await Store.destroy({
      where: {
        id: storeId,
        userId,
      },
    })
    return res.end()
  } catch (error) {
    return res.status(500).end()
  }
}

module.exports = {
  create,
  indexByUser,
  update,
  remove,
}
