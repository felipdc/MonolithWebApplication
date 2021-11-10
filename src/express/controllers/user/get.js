const { models } = require('../../../sequelize');

const getUser = async (email) => models.usuario.findByPk(email);

module.exports = getUser;
