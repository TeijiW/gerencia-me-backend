# Gerencia-me Backend

## Web API created to gerencia-me project, made for Mega Hack Hackathon

### Technologies used: Node.JS, Express, Sequelize BCrypt and JWT

## Steps to Run

- `git clone https://github.com/TeijiW/gerencia-me-backend`
- `cd gerencia-me-backend`
- Create and configure the .env file (instructions below)
- `yarn install`
- `yarn sequelize db:migrate`
- `yarn sequelize db:seed:all`

## Environment Variables

To run this API it's **necessary** set some Environment variables in `.env` file

### Application

- APP_PORT - Port that will be used by app

### Database

- DB_DIALECT - Dialect used to set DBMS that will be used (mysql by default)
- DB_HOST - Database Host name (localhost by default)
- DB_USER - Database user ("root" by default)
- DB_PASSWORD - Database password ("default" by default)
- DB_NAME - Database name ("gerencia_me" bt default)  
  **Database port** is determined in accordance with database dialect

### Authentication

**Warning**: A admin user is created with these credentials to manage another users

- ADMIN_USER - Admin name to login ("admin" by default)
- ADMIN_PASSWORD - Admin password ("admin" by default)

## Routes

**Warning**: "Users" routes it's allowed for admin only

### Users

- "/users"
  - GET - Get all Users
  - POST - Create new user
- "/users/{userId}"
  - GET - Get user by id
  - PUT - Update the user
  - DELETE - Remove the user

### Stores

- "/users/{userId}/stores"
  - GET - Get stores by user
  - POST - Create a store to the refered user
- "/users/{userId}/stores/{storeId}"
  - PUT - Update the store of the refered user
  - DELETE - Remove the store of the refered user

### Categories

- "/users/{userId}/categories"
  - GET - Get categories by user
  - POST - Create a category to the refered user
- "/users/{userId}/categories/{categoryId}"
  - PUT - Update the category of the refered user
  - DELETE - Remove the category of the refered user
- "/users/{userId}/stores/{storeId}/categories
  - GET - Get categories by store
  - POST - Add a category to store

### Products

- "/users/{userId}/products"
  - GET - Get products by user
  - POST - Create a product to the refered user
- "/users/{userId}/products/{productId}"
  - PUT - Update the product of the refered user
  - DELETE - Remove the product of the refered user
- "/users/{userId}/stores/{storeId}/products
  - GET - Get products by store
  - POST - Add a product to store

## Models to made a request

### Observations

- If the request body to "Add/create category or product" has a id, the system will try insert the category or product with that id

### User

```javascript
id: INTEGER,
email: STRING(130),
name: STRING(130),
password: STRING(80),
docNumber: STRING(20), // Can be null
```

### Store

```javascript
{
  id: INTEGER,
  name: STRING(80),
  address: STRING(80), // Can be null
  desc: STRING(140),
  docNumber: STRING(20), // Can be null
  storeType: ENUM(
    "food",
    "supermakert",
    "clothing",
    "drugstore",
    "building materials",
    "other"
  ),
  userId: INTEGER
}
```

### Category

```javascript
id: INTEGER,
name: STRING(80),
userId: INTEGER
```

### Product

```javascript
id: INTEGER
name: STRING(80),
desc: STRING(140),
imageUrl: STRING(140),
price: DECIMAL(10, 2),
categoryId: INTEGER, // Can be null
userId: INTEGER
```

By TeijiW with :heart:
