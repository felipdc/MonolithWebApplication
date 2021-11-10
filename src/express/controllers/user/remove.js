const Joi = require('joi');
const getUser = require('./get');
const { models } = require('../../../sequelize');
const { ResponseError } = require('../../helpers/errors');

const schema = Joi.object().keys({
  email: Joi.string().required(),
});

const getUserRemoveParams = (params) => {
  const {
    email,
  } = params;
  try {
    Joi.assert(params, schema);
  } catch (err) {
    return null;
  }
  return {
    email,
    status: 'inativo',
  };
};

const validateUser = async (email) => {
  const user = await getUser(email);

  if (!user) {
    throw new ResponseError(404, 'Error. User not found');
  } else if (user.status === 'inativo') {
    throw new ResponseError(403, 'Forbidden. User is already removed');
  }
};

const updateUser = async (body) => {
  const userRemoveParams = getUserRemoveParams(body);

  if (!userRemoveParams) {
    throw new ResponseError(400, 'Error. Invalid Params');
  }

  await validateUser(userRemoveParams.email);

  await models.usuario.update(userRemoveParams, {
    where: {
      email: userRemoveParams.email,
    },
  });

  return 0;
};

module.exports = updateUser;
