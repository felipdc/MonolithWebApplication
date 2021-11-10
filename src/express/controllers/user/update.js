const md5 = require('md5');
const _ = require('lodash');
const Joi = require('joi');
const getUser = require('./get');
const { models } = require('../../../sequelize');
const { ResponseError } = require('../../helpers/errors');

const schema = Joi.object().keys({
  nome: Joi.string(),
  telefone: Joi.string(),
  senha: Joi.string(),
  email: Joi.string().required(),
  cep: Joi.string(),
}).or('nome', 'telefone', 'senha', 'cep');

const getUserUpdateParams = (params) => {
  const {
    nome, telefone, senha, email, cep, status,
  } = params;
  try {
    Joi.assert(params, schema);
  } catch (err) {
    return null;
  }
  return _.omitBy({
    nome: nome ? _.capitalize(nome) : null,
    telefone,
    senha: senha ? md5(senha) : null,
    email,
    cep,
    status: status || null,
  }, _.isNil);
};

const validateUser = async (email) => {
  const user = await getUser(email);

  if (!user) {
    throw new ResponseError(404, 'Error. User not found');
  }
};

const updateUser = async (body) => {
  const userUpdateParams = getUserUpdateParams(body);

  if (!userUpdateParams) {
    throw new ResponseError(400, 'Error. Invalid Params');
  }

  await validateUser(userUpdateParams.email);

  await models.usuario.update(userUpdateParams, {
    where: {
      email: userUpdateParams.email,
    },
  });

  return 0;
};

module.exports = updateUser;
