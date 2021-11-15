const _ = require('lodash');
const Joi = require('joi').extend(require('@joi/date'));
const { getUser } = require('../user');
const { getCoupon } = require('../coupon');
const { models } = require('../../../sequelize');
const { ResponseError } = require('../../helpers/errors');

const schema = Joi.object().keys({
  cupomCodigo: Joi.string().required(),
  usuarioEmail: Joi.string().required(),
  status: Joi.string(),
});

const getCouponUsageCreationParams = (params) => {
  const {
    cupomCodigo, usuarioEmail, status,
  } = params;
  try {
    Joi.assert(params, schema);
  } catch (err) {
    return null;
  }
  return _.omitBy({
    cupomCodigo: _.toUpper(cupomCodigo),
    usuarioEmail,
    status,
  }, _.isNil);
};

const validateCouponUsage = async (body) => {
  const user = await getUser(body.usuarioEmail);
  const coupon = await getCoupon(body.cupomCodigo);

  if (!user) {
    throw new ResponseError(404, 'Error - User not found');
  }
  if (!coupon) {
    throw new ResponseError(404, 'Error - Coupon not found');
  }
};

const createCouponUsage = async (body, transaction = null) => {
  const couponUsageCreationParams = getCouponUsageCreationParams(body);

  if (!couponUsageCreationParams) {
    throw new ResponseError(400, 'Error. Invalid Params');
  }

  await validateCouponUsage(body);

  try {
    await models.usocupom.create(couponUsageCreationParams, { transaction });
  } catch (err) {
    if (err.errors[0].type === 'unique violation') {
      throw new ResponseError(409, 'Error. User already used this coupon');
    } else {
      throw new Error();
    }
  }
  return 0;
};

module.exports = createCouponUsage;
