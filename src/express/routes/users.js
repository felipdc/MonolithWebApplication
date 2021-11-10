const { models } = require('../../sequelize');
const { createUser, updateUser, removeUser } = require('../controllers/user');

const getAll = async (_req, res) => {
  const users = await models.usuario.findAll();
  res.status(200).json(users);
};

const getByEmail = async (req, res) => {
  const { email } = req.params;
  const user = await models.usuario.findByPk(email);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).send('404 - Not found');
  }
};

const create = async (req, res) => {
  try {
    await createUser(req.body);
  } catch (err) {
    res.status(err.statusCode || 500).send(err.message || 'Internal Server Error');
  }
  res.status(200).end();
};

const update = async (req, res) => {
  try {
    await updateUser(req.body);
  } catch (err) {
    res.status(err.statusCode || 500).send(err.message || 'Internal Server Error');
  }
  res.status(200).end();
};

const remove = async (req, res) => {
  try {
    await removeUser(req.body);
  } catch (err) {
    res.status(err.statusCode || 500).send(err.message || 'Internal Server Error');
  }
  res.status(200).end();
};

module.exports = {
  getAll,
  getByEmail,
  create,
  update,
  remove,
};
