const { models } = require('../../../sequelize');

const getProduct = async (id) => models.produto.findByPk(id);

module.exports = getProduct;
