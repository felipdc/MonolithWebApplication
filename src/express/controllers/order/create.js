const _ = require('lodash');
const Joi = require('joi').extend(require('@joi/date'));
const { getUser } = require('../user');
const { getCoupon } = require('../coupon');
const { createCouponUsage } = require('../couponUsage');
const { models } = require('../../../sequelize');
const { ResponseError } = require('../../helpers/errors');
const sequelize = require('../../../sequelize');

const schema = Joi.object().keys({
  usuarioEmail: Joi.string().required(),
  cupomCodigo: Joi.string(),
  tipopagamento: Joi.string().valid('boleto', 'credito', 'pix'),
  qtdparcelas: Joi.number(),
});

const getOrderCreationParams = (params) => {
  const {
    usuarioEmail, cupomCodigo, tipopagamento, qtdparcelas,
  } = params;
  try {
    Joi.assert(params, schema);
  } catch (err) {
    return null;
  }
  return _.omitBy({
    usuarioEmail,
    cupomCodigo: cupomCodigo ? _.toUpper(cupomCodigo) : null,
    tipopagamento,
    qtdparcelas,
  }, _.isNil);
};

const validateOrder = async (params) => {
  const user = await getUser(params.usuarioEmail);

  if (!user) {
    throw new ResponseError(404, 'Error. User provided was not found');
  }

  if (params.cupomCodigo) {
    const coupon = await getCoupon(params.cupomCodigo);
    if (!coupon) throw new ResponseError(404, 'Error. Coupon provided was not found');
  }
};

const transactionCreate = async (params) => {
  const t = await sequelize.transaction();
  let newOrder;
  try {
    if (params.cupomCodigo) {
      await createCouponUsage({
        usuarioEmail: params.usuarioEmail,
        cupomCodigo: params.cupomCodigo,
      }, t);
    }

    newOrder = await models.pedido.create(params, { transaction: t });
  } catch (err) {
    console.log(err);
    await t.rollback();
    throw new Error(err);
  }
  await t.commit();
  return newOrder;
};

const createOrder = async (body) => {
  const orderCreationParams = getOrderCreationParams(body);

  if (!orderCreationParams) {
    throw new ResponseError(400, 'Error. Invalid Params');
  }

  await validateOrder(orderCreationParams);

  const newOrder = await transactionCreate(orderCreationParams);

  return newOrder.toJSON();
};

module.exports = createOrder;
