const _ = require('lodash');
const { models } = require('../../../sequelize');

const getCouponUsage = async (query) => models.usocupom.findOne({
  where: {
    cupomCodigo: _.toUpper(query.cupomCodigo),
    usuarioEmail: query.usuarioEmail,
  },
});

module.exports = getCouponUsage;
