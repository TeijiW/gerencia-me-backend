const UserController = require("./controllers/UserController")
const StoreController = require("./controllers/StoreController")
const CategoryController = require("./controllers/CategoryController")
const ProductController = require("./controllers/ProductController")

module.exports = (app) => {
  // Users
  app.route("/users").get(UserController.index).post(UserController.create)

  app
    .route("/users/:userId")
    .get(UserController.getById)
    .put(UserController.update)
    .delete(UserController.remove)

  // Stores
  app
    .route("/users/:userId/stores")
    .get(StoreController.indexByUser)
    .post(StoreController.create)

  app
    .route("/users/:userId/stores/:storeId")
    .put(StoreController.update)
    .delete(StoreController.remove)

  // Categories
  app
    .route("/users/:userId/categories")
    .get(CategoryController.indexByUser)
    .post(CategoryController.create)

  app
    .route("/users/:userId/categories/:categoryId")
    .put(CategoryController.update)
    .delete(CategoryController.remove)

  app
    .route("/users/:userId/stores/:storeId/categories")
    .get(CategoryController.indexByStore)
    .post(CategoryController.addToStore)

  // Products
  app
    .route("/users/:userId/products")
    .get(ProductController.indexByUser)
    .post(ProductController.create)

  app
    .route("/users/:userId/products/:productId")
    .put(ProductController.update)
    .delete(ProductController.remove)

  app
    .route("/users/:userId/stores/:storeId/products")
    .get(ProductController.indexByStore)
    .post(ProductController.addToStore)
}
