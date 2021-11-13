const { DataTypes } = require('sequelize');

module.exports = (sequelize) => sequelize.define('parcelapagamento', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  valor: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
  },
  datalimite: {
    type: DataTypes.DATE,
  },
  datapagamento: {
    type: DataTypes.DATE,
  },
}, {
  timestamps: false,
  freezeTableName: true,
});
