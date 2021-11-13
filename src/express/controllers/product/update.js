const _ = require('lodash');
const Joi = require('joi');
const getProduct = require('./get');
const { models } = require('../../../sequelize');
const { ResponseError } = require('../../helpers/errors');

const schema = Joi.alternatives().try(
  Joi.object().keys({
    id: Joi.number().required(),
    nome: Joi.string(),
    categoria: Joi.string(),
    preço: Joi.number(),
    quantidade: Joi.number(),
    retirar: Joi.bool().forbidden(),
    status: Joi.string().valid('disponível'),
  }).or('nome', 'categoria', 'preço', 'quantidade', 'status'),
  Joi.object().keys({
    id: Joi.number().required(),
    nome: Joi.string().forbidden(),
    categoria: Joi.string().forbidden(),
    preço: Joi.number().forbidden(),
    quantidade: Joi.number().required(),
    retirar: Joi.bool().required(),
  }),
);

const getNewStatus = (status, quantidade) => {
  if (status) {
    return status;
  } if (quantidade > 0) {
    return 'disponível';
  } if (quantidade <= 0) {
    return 'indisponível';
  }
  return null;
};

const getProductUpdateParams = (params) => {
  const {
    nome, categoria, preço, quantidade, retirar, status,
  } = params;
  try {
    Joi.assert(params, schema);
  } catch (err) {
    return null;
  }
  return _.omitBy({
    nome: nome ? _.capitalize(nome) : null,
    categoria,
    preço,
    quantidade,
    status: getNewStatus(status, quantidade),
    retirar,
  }, _.isNil);
};

const getAndValidateProduct = async (id, params) => {
  const product = await getProduct(id);

  const newParams = params;
  if (params.retirar) {
    if (product.quantidade - params.quantidade < 0) {
      throw new ResponseError(406, 'Not acceptable. Not enougth products in the stock.');
    } else {
      newParams.quantidade = product.quantidade - params.quantidade;
      return _.omit(
        { ...newParams, status: newParams.quantidade > 0 ? 'disponível' : 'indisponível' },
        ['retirar'],
      );
    }
  }

  if (!product) {
    throw new ResponseError(404, 'Error. Product not found');
  }

  return _.omit(newParams, ['retirar']);
};

const updateProduct = async (body, transaction = null) => {
  let productUpdateParams = getProductUpdateParams(body);

  if (!productUpdateParams) {
    throw new ResponseError(400, 'Error. Invalid Params');
  }

  productUpdateParams = await getAndValidateProduct(body.id, productUpdateParams);

  await models.produto.update(productUpdateParams, {
    where: {
      id: body.id,
    },
    transaction,
  });

  return 0;
};

module.exports = updateProduct;
