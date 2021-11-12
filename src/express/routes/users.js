const { models } = require('../../sequelize');
const {
  createUser, updateUser, removeUser, getUser,
} = require('../controllers/user');

const get = async (req, res) => {
  if (req.query.email) {
    const user = await getUser(req.query.email);
    if (!user) {
      res.status(404).send('404 - User not found');
    } else {
      res.status(200).json(user);
    }
  } else {
    const users = await models.usuario.findAll();
    res.status(200).json(users);
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
  get,
  create,
  update,
  remove,
};
