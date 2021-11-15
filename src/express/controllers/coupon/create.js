const _ = require('lodash');
const Joi = require('joi').extend(require('@joi/date'));
const { models } = require('../../../sequelize');
const { ResponseError } = require('../../helpers/errors');

const schema = Joi.object().keys({
  codigo: Joi.string().required(),
  descricao: Joi.string(),
  desconto: Joi.number().required(),
  tipodesconto: Joi.string().valid('absoluto', 'porcentagem').required(),
  status: Joi.string(),
  validade: Joi.string(),
});

const getCouponCreationParams = (params) => {
  const {
    codigo, descricao, desconto, tipodesconto, status, validade,
  } = params;
  try {
    Joi.assert(params, schema);
  } catch (err) {
    return null;
  }
  return _.omitBy({
    codigo: codigo ? _.toUpper(codigo) : null,
    descricao,
    desconto,
    tipodesconto,
    status,
    validade,
  }, _.isNil);
};

const createCoupon = async (body) => {
  const couponCreationParams = getCouponCreationParams(body);

  console.log(couponCreationParams);

  if (!couponCreationParams) {
    throw new ResponseError(400, 'Error. Invalid Params');
  }

  let newCoupon;
  try {
    newCoupon = await models.cupom.create(couponCreationParams);
  } catch (err) {
    if (err.errors[0].type === 'unique violation') {
      throw new ResponseError(409, 'Error. Coupon already exists');
    }
  }
  return newCoupon.toJSON();
};

module.exports = createCoupon;
