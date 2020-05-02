const Sequelize = require("sequelize")
const Product = require("../models/Product")
const User = require("../models/User")
const Store = require("../models/Store")
const Category = require("../models/Category")

const indexByUser = async (req, res) => {
  const userId = Number(req.params.userId)

  try {
    const user = await User.findByPk(userId, {
      // include: { association: "products" },
    })
    if (!user) return res.status(404).json({ error: "User not found" })
    products = await Product.findAll({ where: { userId } })
    // return res.json(user)
    return res.json(products)
  } catch (error) {
    return res.status(500).end()
  }
}

const create = async (req, res) => {
  const userIdParam = Number(req.params.userId)
  const { name, desc, imageUrl, price, userId, categoryId } = req.body

  if (Number(userId) !== userIdParam)
    return res.status(400).json({
      error: "userID in the parameters and in the body do not match",
    })

  if (categoryId) {
    const category = await Category.findByPk(categoryId)
    if (!category)
      return res
        .status(404)
        .json({ error: "Category is informed but not found" })
  }

  const user = await User.findByPk(userId)
  if (!user) {
    return res.status(404).json({ error: "User not found" })
  }
  try {
    const product = await Product.create({
      name,
      desc,
      imageUrl,
      price,
      userId,
      categoryId,
    })

    return res.status(201).json(product)
  } catch (error) {
    if (error instanceof Sequelize.DatabaseError) {
      return res.status(400).json({ error: "Invalid Request" })
    }
    return res.status(500).end()
  }
}

const update = async (req, res) => {
  const userIdParam = Number(req.params.userId)
  const productIdParam = Number(req.params.productId)
  const { name, desc, imageUrl, price, categoryId } = req.body
  const id = Number(req.body.id)
  const userId = Number(req.body.userId)
  const productToUpdate = {
    id,
    name,
    desc,
    imageUrl,
    price,
    userId,
    categoryId,
  }
  if (userIdParam !== userId || productIdParam !== id)
    return res.status(400).json({
      error:
        "userID or productID in the parameters and in the body do not match",
    })

  const user = await User.findByPk(userIdParam)
  const product = await Product.findByPk(productIdParam)
  const allStores = await product.getStores()

  if (categoryId) {
    const category = await Category.findByPk(categoryId)
    if (!category) {
      return res
        .status(404)
        .json({ error: "Category is informed but not found" })
    }
    const storesWithCategory = []
    for (let i = 0; i < allStores.length; i++) {
      const categoryExists = await allStores[i].hasCategory(category)
      if (categoryExists) storesWithCategory.push(allStores[i])
    }

    if (storesWithCategory.length < allStores.length) {
      return res.status(400).json({
        error:
          "This category is not associated with all stores of this product",
      })
    }
  }

  if (!user || !product) return res.status(404).json({ error: "Not Found" })

  try {
    await Product.update(productToUpdate, {
      where: { id },
    })
    return res.end()
  } catch (error) {
    console.log(error)
    return res.status(500).end()
  }
}

const remove = async (req, res) => {
  const productId = Number(req.params.productId)
  const userId = Number(req.params.userId)
  try {
    await Product.destroy({
      where: {
        id: productId,
        userId,
      },
    })
    return res.end()
  } catch (error) {
    return res.status(500).end()
  }
}

const addToStore = async (req, res) => {
  const { name, desc, imageUrl, price, categoryId } = req.body
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

  if (categoryId) {
    const category = await Category.findByPk(categoryId)
    const categoryExists = await store.hasCategory(category)
    if (!categoryExists) {
      return res
        .status(400)
        .json({ error: "This category is not associated to this store" })
    }
  }
  try {
    const [product] = await Product.findOrCreate({
      defaults: {
        name,
        desc,
        imageUrl,
        price,
        categoryId,
        userId,
      },
      where: { id },
    })

    await store.addProduct(product)
    return res.status(201).json(product)
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
    // const products = await Product.findAll({ where: { userId } })
    const products = await store.getProducts()
    return res.json(products)
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
