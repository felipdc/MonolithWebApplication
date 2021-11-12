const { models } = require('../../../sequelize');

const getOrder = async (id) => models.pedido.findByPk(id);

module.exports = getOrder;
