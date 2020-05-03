const UserController = require("./controllers/UserController")
const StoreController = require("./controllers/StoreController")
const CategoryController = require("./controllers/CategoryController")
const ProductController = require("./controllers/ProductController")
const AuthController = require("./controllers/AuthController")
const authMiddleware = require("./middlewares/auth")
const adminMiddleware = require("./middlewares/admin")

module.exports = (app) => {
  // Auth
  app.route("/auth").post(AuthController.auth)
  app.use(authMiddleware)

  // Users
  app
    .route("/users")
    .all(adminMiddleware)
    .get(UserController.index)
    .post(UserController.create)

  app
    .route("/users/:userId")
    .get(UserController.getById)
    .put(UserController.update)
    .delete(UserController.remove)

  // Stores
  app
    .route("/stores")
    .get(StoreController.indexByUser)
    .post(StoreController.create)

  app
    .route("/stores/:storeId")
    .put(StoreController.update)
    .delete(StoreController.remove)

  // Categories
  app
    .route("/categories")
    .get(CategoryController.indexByUser)
    .post(CategoryController.create)

  app
    .route("/categories/:categoryId")
    .put(CategoryController.update)
    .delete(CategoryController.remove)

  app
    .route("/stores/:storeId/categories")
    .get(CategoryController.indexByStore)
    .post(CategoryController.addToStore)

  // Products
  app
    .route("/products")
    .get(ProductController.indexByUser)
    .post(ProductController.create)

  app
    .route("/products/:productId")
    .put(ProductController.update)
    .delete(ProductController.remove)

  app
    .route("/stores/:storeId/products")
    .get(ProductController.indexByStore)
    .post(ProductController.addToStore)
}
