const _ = require('lodash');
const Joi = require('joi').extend(require('@joi/date'));
const { getOrder, updateOrder } = require('../order');
const { getProduct, updateProduct } = require('../product');
const { models } = require('../../../sequelize');
const { ResponseError } = require('../../helpers/errors');
const sequelize = require('../../../sequelize');

const schema = Joi.object().keys({
  pedidoId: Joi.number().required(),
  produtoId: Joi.number().required(),
  quantidade: Joi.number().required(),
});

const getOrderItemCreationParams = (params) => {
  const {
    pedidoId, produtoId, quantidade,
  } = params;
  try {
    Joi.assert(params, schema);
  } catch (err) {
    return null;
  }
  return _.omitBy({
    pedidoId,
    produtoId,
    quantidade,
  }, _.isNil);
};

const validateOrderItem = async (params) => {
  const product = await getProduct(params.produtoId);

  if (!product) {
    throw new ResponseError(404, 'Error. Product provided was not found');
  }

  const order = await getOrder(params.pedidoId);

  if (!order) {
    throw new ResponseError(404, 'Error. Order provided was not found');
  }
};

const getPrice = async (params) => {
  const product = await getProduct(params.produtoId);
  return params.quantidade * product.preço;
};

const transactionUpdate = async (params) => {
  const t = await sequelize.transaction();
  try {
    await updateProduct({
      id: params.produtoId,
      quantidade: params.quantidade,
      retirar: true,
    }, t);

    await updateOrder({
      id: params.pedidoId,
      precoAdicional: await getPrice(params),
    }, t);

    await models.itempedido.create(params, { transaction: t });
  } catch (err) {
    console.log(err);
    await t.rollback();
    throw new Error(err);
  }
  await t.commit();
};

const createOrderItem = async (body) => {
  const orderItemCreationParams = getOrderItemCreationParams(body);

  if (!orderItemCreationParams) {
    throw new ResponseError(400, 'Error. Invalid Params');
  }

  await validateOrderItem(orderItemCreationParams);

  await transactionUpdate(orderItemCreationParams);

  return 0;
};

module.exports = createOrderItem;
