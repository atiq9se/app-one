const sequelize  = require("./dbmodel");
const { DataTypes }   = require("sequelize");

const Product = sequelize.define('products', {
      name: {
            type: DataTypes.STRING,
            allowNull: false
      },
      category: {
            type: DataTypes.STRING,
            allowNull: false
      },
      price:{
            type: DataTypes.NUMBER,
            allowNull: false
      },
      description: {
            type: DataTypes.NUMBER,
            allowNull: false
      }
})

module.exports = Product;