const { DataTypes } = require('sequelize');

module.exports = (sequelize) => sequelize.define('itempedido', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  quantidade: {
    type: DataTypes.INTEGER,
  },
  preco: {
    type: DataTypes.INTEGER,
  },
});
