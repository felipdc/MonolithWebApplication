const _ = require('lodash');
const { models } = require('../../../sequelize');

const getCoupon = async (codigo) => models.cupom.findByPk(_.toUpper(codigo));

module.exports = getCoupon;
