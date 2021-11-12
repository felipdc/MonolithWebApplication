const { models } = require('../../sequelize');
const { getIdParam } = require('../helpers/helpers');
const {
  createOrder, getOrder, updateOrder,
} = require('../controllers/order');

const get = async (_req, res) => {
  const orders = await models.pedido.findAll();
  res.status(200).json(orders);
};

const getById = async (req, res) => {
  const id = getIdParam(req);
  const product = await getOrder(id);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).send('404 - Not found');
  }
};

const create = async (req, res) => {
  try {
    await createOrder(req.body);
  } catch (err) {
    res.status(err.statusCode || 500).send(err.message || 'Internal Server Error');
  }
  res.status(200).end();
};

const update = async (req, res) => {
  try {
    await updateOrder(req.body);
  } catch (err) {
    res.status(err.statusCode || 500).send(err.message || 'Internal Server Error');
  }
  res.status(200).end();
};

module.exports = {
  get,
  getById,
  create,
  update,
};
