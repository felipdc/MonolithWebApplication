const Joi = require('joi');
const _ = require('lodash');
const getCouponUsage = require('./get');
const { models } = require('../../../sequelize');
const { ResponseError } = require('../../helpers/errors');

const schema = Joi.object().keys({
  cupomCodigo: Joi.string().required(),
  usuarioEmail: Joi.string().required(),
});

const getCouponUsageRemoveParams = (params) => {
  const {
    cupomCodigo, usuarioEmail,
  } = params;
  try {
    Joi.assert(params, schema);
  } catch (err) {
    return null;
  }
  return _.omitBy({
    cupomCodigo: _.toUpper(cupomCodigo),
    usuarioEmail,
  }, _.isNil);
};

const validateCouponUsage = async (couponUsageKeys) => {
  const couponUsage = await getCouponUsage(couponUsageKeys);

  if (!couponUsage) {
    throw new ResponseError(404, 'Error. Coupon Usage not found');
  }
};

const removeCouponUsage = async (body) => {
  const couponUsageRemoveParams = getCouponUsageRemoveParams(body);

  if (!couponUsageRemoveParams) {
    throw new ResponseError(400, 'Error. Invalid Params');
  }

  const couponUsageKeys = {
    cupomCodigo: body.cupomCodigo,
    usuarioEmail: body.usuarioEmail,
  };

  await validateCouponUsage(couponUsageKeys);

  try {
    await models.usocupom.destroy({ where: couponUsageKeys });
  } catch (err) {
    console.log(err);
    throw new Error();
  }

  return 0;
};

module.exports = removeCouponUsage;
