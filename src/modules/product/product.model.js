const path = require("path");
const sequelize = require(path.join(process.cwd(), 'src/config/lib/sequelize.js'))
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