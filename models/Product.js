// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../db/connection');
const Category = require('./Category');
const ProductTag = require('./ProductTag');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      unique:{
        args: true,
        msg: 'Please enter a valid number',
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 10,
        unique:{
          args: true,
          msg: 'Please enter a valid number',
        },
        category_id: {
          type: DataTypes.INTEGER,
          allowNull: false,

        }
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

Category.hasMany(Product);
Product.hasOne(Category);
Product.belongsToMany(Tag, {through: ProductTag});
Tag.belongsToMany(Product, {through: ProductTag});

module.exports = Product;
