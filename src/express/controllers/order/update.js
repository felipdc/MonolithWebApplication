const _ = require('lodash');
const Joi = require('joi');
const getOrder = require('./get');
const { getCoupon } = require('../coupon');
const { models } = require('../../../sequelize');
const { ResponseError } = require('../../helpers/errors');

const schema = Joi.object().keys({
  id: Joi.number().required(),
  cupomCodigo: Joi.string(),
  tipopagamento: Joi.string().valid('boleto', 'credito', 'pix'),
  qtdparcelas: Joi.number(),
  precototal: Joi.number(),
  precofinal: Joi.number(),
  status: Joi.string().valid('incompleto', 'pago', 'pagamento pendente', 'cancelado', 'processando pagamento'),
}).or('cupomCodigo', 'tipopagamento', 'qtdparcelas', 'status');

const getOrderUpdateParams = (params) => {
  const {
    cupomCodigo, tipopagamento, qtdparcelas, status, precototal, precofinal,
  } = params;
  try {
    Joi.assert(params, schema);
  } catch (err) {
    return null;
  }
  return _.omitBy({
    cupomCodigo,
    tipopagamento,
    qtdparcelas,
    status,
    precototal,
    precofinal,
  }, _.isNil);
};

const getFinalPrice = (totalPrice, coupon) => {
  if (coupon.tipodesconto === 'absoluto') {
    if (totalPrice - coupon.desconto > 0) return totalPrice - coupon.desconto;
    return 0;
  }
  return (totalPrice * (coupon.desconto / 100));
};

const getAndValidateOrder = async (id, params) => {
  const order = await getOrder(id);

  if (!order) {
    throw new ResponseError(404, 'Error. Order not found');
  }

  let coupon;
  if (params.cupomCodigo) {
    coupon = await getCoupon(params.cupomCodigo);
    if (!coupon) throw new ResponseError(404, 'Error. Coupon provided was not found');
  }

  return _.omitBy({
    usuarioEmail: order.usuarioEmail,
    cupomCodigo: params.cupomCodigo,
    tipopagamento: params.tipopagamento,
    qtdparcelas: params.qtdparcelas,
    status: params.status,
    precototal: params.precototal,
    precofinal: params.cupomCodigo ? getFinalPrice(params.precototal, coupon) : params.precototal,
  }, _.isNil);
};

const updateOrder = async (body) => {
  let orderUpdateParams = getOrderUpdateParams(body);

  if (!orderUpdateParams) {
    throw new ResponseError(400, 'Error. Invalid Params');
  }

  orderUpdateParams = await getAndValidateOrder(body.id, orderUpdateParams);

  await models.pedido.update(orderUpdateParams, {
    where: {
      id: body.id,
    },
  });
  return 0;
};

module.exports = updateOrder;
