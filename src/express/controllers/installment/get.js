const { models } = require('../../../sequelize');

const getInstallment = async (params) => {
  if (!params.where) {
    return models.parcelapagamento.findByPk(params.id);
  }
  return models.parcelapagamento.findAll({
    where: JSON.parse(params.where),
  });
};

module.exports = getInstallment;
