const Sequelize = require("sequelize")
const User = require("../models/User")
const Category = require("../models/Category")
const Store = require("../models/Store")

const indexByUser = async (req, res) => {
  const userId = Number(req.params.userId)

  try {
    const user = await User.findByPk(userId, {
      include: { association: "categories" },
    })
    if (!user) return res.status(404).json({ error: "User not found" })

    return res.json(user)
  } catch (error) {
    return res.status(500).end()
  }
}

const create = async (req, res) => {
  const userIdParam = Number(req.params.userId)
  const { name, userId } = req.body

  if (Number(userId) !== userIdParam)
    return res.status(400).json({
      error: "userID in the parameters and in the body do not match",
    })

  const user = await User.findByPk(userId)
  if (!user) return res.status(404).json({ error: "User not found" })

  try {
    const category = await Category.create({
      name,
      userId,
    })

    return res.status(201).json(category)
  } catch (error) {
    if (error instanceof Sequelize.DatabaseError) {
      return res.status(400).json({ error: "Invalid Request" })
    }
    return res.status(500).end()
  }
}

const update = async (req, res) => {
  const userIdParam = Number(req.params.userId)
  const categoryIdParam = Number(req.params.categoryId)
  const { name } = req.body
  const id = Number(req.body.id)
  const userId = Number(req.body.userId)
  const categoryToUpdate = {
    id,
    name,
  }
  if (userIdParam !== userId || categoryIdParam !== id)
    return res.status(400).json({
      error:
        "userId or CategoryId in the parameters and in the body do not match",
    })

  const user = await User.findByPk(userIdParam)
  const category = await Category.findByPk(categoryIdParam)
  if (!user || !category) return res.status(404).json({ error: "Not Found" })
  try {
    await Category.update(categoryToUpdate, {
      where: { id },
    })
    return res.end()
  } catch (error) {
    console.log(error)
    return res.status(500).end()
  }
}

const remove = async (req, res) => {
  const categoryId = Number(req.params.categoryId)
  const userId = Number(req.params.userId)
  try {
    await Category.destroy({
      where: {
        id: categoryId,
        userId,
      },
    })
    return res.end()
  } catch (error) {
    return res.status(500).end()
  }
}

const addToStore = async (req, res) => {
  const { name } = req.body
  const id = req.body.id ? Number(req.body.id) : null
  const userId = Number(req.body.userId)
  const userIdParam = Number(req.params.userId)
  const storeId = Number(req.params.storeId)

  const store = await Store.findByPk(storeId)
  if (!store) return res.status(404).json({ error: "Store not found" })

  if (userIdParam !== userId)
    return res.status(400).json({
      error: "userID in the parameters and in the body do not match",
    })

  if (store.dataValues.userId !== userId) {
    return res.status(403).json({ error: "Permission denied" })
  }

  const user = await User.findByPk(userIdParam)
  if (!user) return res.status(404).json({ error: "Not Found" })

  try {
    const [category] = await Category.findOrCreate({
      defaults: {
        name,
        userId,
      },
      where: { id },
    })

    await store.addCategory(category)
    return res.status(201).json(category)
  } catch (error) {
    console.log(error)
    return res.status(500).end()
  }
}

const indexByStore = async (req, res) => {
  const storeId = Number(req.params.storeId)
  const userId = Number(req.params.userId)
  try {
    const store = await Store.findByPk(storeId)
    if (!store) return res.status(404).json({ error: "Store not found" })
    if (store.dataValues.userId !== userId) {
      return res.status(403).json({ error: "Permission denied" })
    }
    const categories = await store.getCategories()
    return res.json(categories)
  } catch (error) {
    console.log(error)
    return res.status(500).end()
  }
}

module.exports = {
  create,
  indexByUser,
  update,
  remove,
  addToStore,
  indexByStore,
}
