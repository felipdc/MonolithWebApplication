const { models } = require('../../../sequelize');

const getInstallment = async (id, where = null) => {
  if (!where) {
    return models.parcelapagamento.findByPk(id);
  }
  return models.parcelapagamento.findAll({
    where,
  });
};

module.exports = getInstallment;
