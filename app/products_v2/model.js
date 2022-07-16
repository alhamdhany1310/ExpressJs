const sequelize = require('../../config/sequelize');
const { Sequelize, DataTypes } = require('sequelize');
const Product = sequelize.define('Product', {
  // id: {
  //   type: DataTypes.STRING,
  //   primaryKey: true,
  //   autoIncrement: true,
  //   allowNull: false,
  // },
  usersId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.TEXT,
  },
});

module.exports = Product;
