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
    nome,
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
  try {
    await models.usuario.create(userCreateParams);
  } catch (err) {
    console.log(err);
    if (err.errors[0].type === 'unique violation') {
      throw new ResponseError(409, 'Error. User already exists');
    } else throw new ResponseError(500, 'Internal Server Errror');
  }
  return 0;
};

module.exports = createUser;
