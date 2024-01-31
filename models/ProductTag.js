const { Model, DataTypes } = require('sequelize');

const sequelize = require('../db/connection');
const Product = require('./Product');
const Tag = require('./Tag');

class ProductTag extends Model { }

ProductTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: false,
      allowNull: false,
    },
    tag_id: {
      type: DataTypes.INTEGER,
      primaryKey: false,
      allowNull: false,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  },
);
ProductTag.belongsTo(Product);
ProductTag.belongsTo(Tag);
module.exports = ProductTag;
