const { models } = require('../../../sequelize');

const getInstallment = async (id) => models.parcelapagamento.findByPk(id);

module.exports = getInstallment;
