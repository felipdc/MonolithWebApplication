const { models } = require('../../../sequelize');

const getOrderItem = async (id) => models.itempedido.findByPk(id);

module.exports = getOrderItem;
