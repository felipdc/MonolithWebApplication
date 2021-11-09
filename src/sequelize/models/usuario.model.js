const { DataTypes } = require('sequelize');

module.exports = (sequelize) => sequelize.define('usuario', {
  email: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
  },
  telefone: {
    type: DataTypes.STRING,
  },
  senha: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.STRING,
  },
  cep: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: false,
  freezeTableName: true,
});
