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
  status: {
    type: DataTypes.STRING,
  },
});
