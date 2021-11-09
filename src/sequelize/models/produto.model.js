const { DataTypes } = require('sequelize');

module.exports = (sequelize) => sequelize.define('produto', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoria: {
    type: DataTypes.STRING,
  },
  preço: {
    type: DataTypes.INTEGER,
  },
  quantidade: {
    type: DataTypes.INTEGER,
  },
  status: {
    type: DataTypes.STRING,
  },
});
