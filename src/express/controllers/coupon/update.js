const _ = require('lodash');
const Joi = require('joi');
const getCoupon = require('./get');
const { models } = require('../../../sequelize');
const { ResponseError } = require('../../helpers/errors');

const schema = Joi.object().keys({
  codigo: Joi.string().required(),
  descricao: Joi.string(),
  desconto: Joi.number(),
  tipodesconto: Joi.string(),
  status: Joi.string(),
  validade: Joi.string(),
}).or('descricao', 'desconto', 'tipodesconto', 'status', 'validade');

const getCouponUpdateParams = (params) => {
  const {
    descricao, desconto, tipodesconto, status, validade,
  } = params;
  try {
    Joi.assert(params, schema);
  } catch (err) {
    return null;
  }
  return _.omitBy({
    descricao,
    desconto,
    tipodesconto,
    status,
    validade,
  }, _.isNil);
};

const validateCoupon = async (codigo) => {
  const coupon = await getCoupon(codigo);

  if (!coupon) {
    throw new ResponseError(404, 'Error. Coupon not found');
  }
};

const updateCoupon = async (body) => {
  const couponUpdateParams = getCouponUpdateParams(body);

  if (!updateCoupon) {
    throw new ResponseError(400, 'Error. Invalid Params');
  }

  await validateCoupon(body.codigo);

  await models.cupom.update(couponUpdateParams, {
    where: {
      codigo: body.codigo,
    },
  });

  return 0;
};

module.exports = updateCoupon;
