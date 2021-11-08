const { DataTypes } = require('sequelize');

module.exports = (sequelize) => sequelize.define('pedido', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  precototal: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  precofinal: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipopagamento: {
    type: DataTypes.STRING,
  },
  qtdparcelas: {
    type: DataTypes.INTEGER,
  },
  data: {
    type: DataTypes.DATE,
  },
});
