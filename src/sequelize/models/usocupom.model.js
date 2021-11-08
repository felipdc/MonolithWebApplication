const { DataTypes } = require('sequelize');

module.exports = (sequelize) => sequelize.define('usocupom', {
  data: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});
