const { DataTypes } = require('sequelize');

module.exports = (sequelize) => sequelize.define('cupom', {
  codigo: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  descricao: {
    type: DataTypes.STRING,
  },
  desconto: {
    type: DataTypes.STRING,
  },
  tipodesconto: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.STRING,
  },
  validade: {
    type: DataTypes.DATE,
  },
}, {
  timestamps: false,
  freezeTableName: true,
});
