const _ = require('lodash');
const Joi = require('joi').extend(require('@joi/date'));
const getOrder = require('../order/get');
const { models } = require('../../../sequelize');
const { ResponseError } = require('../../helpers/errors');

const schema = Joi.object().keys({
  pedidoId: Joi.number().required(),
  valor: Joi.number().required(),
  datalimite: Joi.string(),
});

const getInstallmentCreationParams = (params) => {
  const {
    id, pedidoId, valor, datalimite,
  } = params;
  try {
    Joi.assert(params, schema);
  } catch (err) {
    return null;
  }
  return _.omitBy({
    id,
    pedidoId,
    valor,
    datalimite,
  }, _.isNil);
};

const validateInstallment = async (params) => {
  const order = await getOrder(params.pedidoId);

  if (!order) {
    throw new ResponseError(404, 'Error. Order provided was not found');
  }
};

const createInstallment = async (body, transaction = null) => {
  const installmentCreationParams = getInstallmentCreationParams(body);

  if (!installmentCreationParams) {
    throw new ResponseError(400, 'Error. Invalid Params');
  }

  await validateInstallment(installmentCreationParams);

  await models.parcelapagamento.create(installmentCreationParams, {
    transaction,
  });

  return 0;
};

module.exports = createInstallment;
