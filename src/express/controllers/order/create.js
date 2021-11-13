const _ = require('lodash');
const Joi = require('joi').extend(require('@joi/date'));
const { getUser } = require('../user');
const { getCoupon } = require('../coupon');
const { createCouponUsage } = require('../couponUsage');
const { models } = require('../../../sequelize');
const { ResponseError } = require('../../helpers/errors');

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

    await createCouponUsage({
      usuarioEmail: params.usuarioEmail,
      cupomCodigo: params.cupomCodigo,
    });
  }
};

const createOrder = async (body) => {
  const orderCreationParams = getOrderCreationParams(body);

  if (!orderCreationParams) {
    throw new ResponseError(400, 'Error. Invalid Params');
  }

  await validateOrder(orderCreationParams);

  await models.pedido.create(orderCreationParams);

  return 0;
};

module.exports = createOrder;
