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
  },
  precofinal: {
    type: DataTypes.INTEGER,
  },
  status: {
    type: DataTypes.STRING,
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
}, {
  timestamps: false,
  freezeTableName: true,
});
