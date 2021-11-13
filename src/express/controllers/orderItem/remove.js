const _ = require('lodash');
const Joi = require('joi').extend(require('@joi/date'));
const { updateOrder } = require('../order');
const { updateProduct, getProduct } = require('../product');
const get = require('./get');
const { models } = require('../../../sequelize');
const { ResponseError } = require('../../helpers/errors');
const sequelize = require('../../../sequelize');

const schema = Joi.object().keys({
  id: Joi.number().required(),
});

const getOrderItemRemoveParams = (params) => {
  const {
    id,
  } = params;
  try {
    Joi.assert(params, schema);
  } catch (err) {
    return null;
  }
  return _.omitBy({
    id,
  }, _.isNil);
};

const validateAndTransactionRemove = async (id) => {
  const orderItem = await get(id);

  if (!orderItem) {
    throw new ResponseError(404, 'Error. Order Item provided was not found');
  }

  const product = await getProduct(orderItem.produtoId);

  const t = await sequelize.transaction();
  try {
    await updateProduct({
      id: product.id,
      quantidade: -orderItem.quantidade,
      retirar: true,
    }, t);

    await updateOrder({
      id: orderItem.pedidoId,
      precoAdicional: -orderItem.quantidade * product.preço,
    }, t);

    await models.itempedido.destroy({ where: { id } }, { transaction: t });
  } catch (err) {
    console.log(err);
    await t.rollback();
    throw new Error(err);
  }

  await t.commit();
};

const removeOrderItem = async (body) => {
  const orderItemRemoveParams = getOrderItemRemoveParams(body);

  if (!orderItemRemoveParams) {
    throw new ResponseError(400, 'Error. Invalid Params');
  }

  await validateAndTransactionRemove(orderItemRemoveParams.id);

  return 0;
};

module.exports = removeOrderItem;
