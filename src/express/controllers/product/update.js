const _ = require('lodash');
const Joi = require('joi');
const { models } = require('../../../sequelize');
const { ResponseError } = require('../../helpers/errors');

const schema = Joi.object().keys({
  nome: Joi.string(),
  categoria: Joi.string(),
  preço: Joi.number(),
  quantidade: Joi.number(),
  retirar: Joi.number(),
}).or('nome', 'categoria', 'preço', 'quantidade');

const getProductUpdateParams = (params) => {
  const {
    nome, categoria, preço, quantidade,
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
    status: quantidade > 0 ? 'disponível' : 'indisponível',
  }, _.isNil);
};

const updateProduct = async (body) => {
  const productUpdateParams = getProductUpdateParams(body);

  if (!productUpdateParams) {
    throw new ResponseError(400, 'Error. Invalid Params');
  }

  await models.produto.create(productUpdateParams);
  return 0;
};

module.exports = updateProduct;
