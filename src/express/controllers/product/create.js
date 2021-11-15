const _ = require('lodash');
const Joi = require('joi');
const { models } = require('../../../sequelize');
const { ResponseError } = require('../../helpers/errors');

const schema = Joi.object().keys({
  nome: Joi.string().required(),
  categoria: Joi.string().required(),
  preço: Joi.number().required(),
  quantidade: Joi.number().required(),
});

const getProductCreationParams = (params) => {
  const {
    nome, categoria, preço, quantidade,
  } = params;
  try {
    Joi.assert(params, schema);
  } catch (err) {
    return null;
  }
  return _.omitBy({
    nome,
    categoria,
    preço,
    quantidade,
    status: quantidade > 0 ? 'disponível' : 'indisponível',
  }, _.isNil);
};

const createProduct = async (body) => {
  const productCreateParams = getProductCreationParams(body);

  if (!productCreateParams) {
    throw new ResponseError(400, 'Error. Invalid Params');
  }

  const newProduct = await models.produto.create(productCreateParams);
  return newProduct.toJSON();
};

module.exports = createProduct;
