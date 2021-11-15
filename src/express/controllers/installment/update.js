const _ = require('lodash');
const Joi = require('joi');
const sequelize = require('../../../sequelize');
const { updateOrder } = require('../order');
const getInstallment = require('./get');
const { models } = require('../../../sequelize');
const { ResponseError } = require('../../helpers/errors');

const schema = Joi.object().keys({
  id: Joi.number().required(),
  status: Joi.string().valid('aprovado', 'rejeitado').required(),
});

const getInstallmentUpdateParams = (params) => {
  const {
    status,
  } = params;
  try {
    Joi.assert(params, schema);
  } catch (err) {
    return null;
  }
  return _.omitBy({
    status,
  }, _.isNil);
};

const validateInstallment = async (id, params) => {
  const installment = await getInstallment({ id });
  if (!installment) {
    throw new ResponseError(404, 'Error. Installment provided was not found');
  }

  if (installment.status === 'aprovado' && params.status === 'aprovado') {
    throw new ResponseError(409, 'Error. Installment was already paid');
  }
};

const isLastInstallment = async (id) => {
  const installment = await getInstallment({ id });

  const orderInstallments = await getInstallment({
    where: JSON.stringify({
      pedidoId: installment.pedidoId,
    }),
  });

  console.log(orderInstallments);

  if (orderInstallments.length === 1) return true;

  _.remove(orderInstallments, (_installment) => _installment.id === id);

  return orderInstallments.every((_installment) => _installment.status === 'aprovado');
};

const updateOrderAndInstallment = async (id, params) => {
  const installment = await getInstallment({ id });
  const t = await sequelize.transaction();
  console.log(params);
  try {
    await updateOrder({
      id: installment.pedidoId,
      status: 'pago',
    });

    await models.parcelapagamento.update(params, {
      where: {
        id,
      },
      transaction: t,
    });
  } catch (err) {
    console.log(err);
    await t.rollback();
    throw err;
  }
  await t.commit();
};

const updateInstallment = async (body, transaction = null) => {
  const installmentUpdateParams = getInstallmentUpdateParams(body);

  if (!installmentUpdateParams) {
    throw new ResponseError(400, 'Error. Invalid Params');
  }

  await validateInstallment(body.id, installmentUpdateParams);

  if (await isLastInstallment(body.id) && installmentUpdateParams.status === 'aprovado') {
    await updateOrderAndInstallment(body.id, installmentUpdateParams);
    return 0;
  }

  await models.parcelapagamento.update(installmentUpdateParams, {
    where: {
      id: body.id,
    },
    transaction,
  });

  return 0;
};

module.exports = updateInstallment;
