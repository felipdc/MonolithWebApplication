const { DataTypes } = require('sequelize');

module.exports = (sequelize) => sequelize.define('usocupom', {
  usuarioEmail: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  cupomCodigo: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  data: {
    type: DataTypes.DATE,
  },
  status: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: false,
  freezeTableName: true,
});
