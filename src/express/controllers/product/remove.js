const Joi = require('joi');
const getProduct = require('./get');
const { models } = require('../../../sequelize');
const { ResponseError } = require('../../helpers/errors');

const schema = Joi.object().keys({
  id: Joi.number().required(),
});

const getProductRemoveParams = (params) => {
  const {
    id,
  } = params;
  try {
    Joi.assert(params, schema);
  } catch (err) {
    return null;
  }
  return {
    id,
    status: 'inativo',
  };
};

const validateProduct = async (id) => {
  const product = await getProduct(id);

  if (!product) {
    throw new ResponseError(404, 'Error. Product not found');
  } else if (product.status === 'inativo') {
    throw new ResponseError(406, 'Not Acceptable. Product is already removed');
  }
};

const removeProduct = async (body) => {
  const productRemoveParams = getProductRemoveParams(body);

  if (!productRemoveParams) {
    throw new ResponseError(400, 'Error. Invalid Params');
  }

  await validateProduct(body.id);

  const removedProduct = await models.produto.update(productRemoveParams, {
    where: {
      id: body.id,
    },
    returning: true,
  });

  return removedProduct[1][0];
};

module.exports = removeProduct;
