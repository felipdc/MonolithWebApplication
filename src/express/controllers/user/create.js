const md5 = require('md5');
const _ = require('lodash');
const Joi = require('joi');
const { models } = require('../../../sequelize');
const { ResponseError } = require('../../helpers/errors');

const schema = Joi.object().keys({
  nome: Joi.string().required(),
  telefone: Joi.string().required(),
  senha: Joi.string().required(),
  email: Joi.string().required(),
  cep: Joi.string(),
});

const getUserCreationParams = (params) => {
  const {
    nome, telefone, senha, email, cep,
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
    status: 'ativo',
  }, _.isNil);
};

const createUser = async (body) => {
  const userCreateParams = getUserCreationParams(body);

  if (!userCreateParams) {
    throw new ResponseError(400, 'Error. Invalid Params');
  }

  await models.usuario.create(userCreateParams);
  return 0;
};

module.exports = createUser;
