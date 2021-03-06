const Sequelize = require("sequelize")
const config = require("../config/database")
const User = require("../models/User")
const Store = require("../models/Store")
const Category = require("../models/Category")
const Product = require("../models/Product")

const connection = new Sequelize(config)

User.init(connection)
Store.init(connection)
Category.init(connection)
Product.init(connection)

User.associate(connection.models)
Store.associate(connection.models)
Category.associate(connection.models)
Product.associate(connection.models)

module.exports = connection
