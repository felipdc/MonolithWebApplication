const { models } = require('../../sequelize');
const { getIdParam } = require('../helpers/helpers');
const {
  getOrderItem, createOrderItem, removeOrderItem,
} = require('../controllers/orderItem');

const get = async (_req, res) => {
  const orders = await models.itempedido.findAll();
  res.status(200).json(orders);
};

const getById = async (req, res) => {
  const id = getIdParam(req);
  const orderItem = await getOrderItem(id);
  if (orderItem) {
    res.status(200).json(orderItem);
  } else {
    res.status(404).send('404 - Not found');
  }
};

const create = async (req, res) => {
  let orderItem;
  try {
    orderItem = await createOrderItem(req.body);
  } catch (err) {
    res.status(err.statusCode || 500).send(err.message || 'Internal Server Error');
  }
  res.status(200).send(orderItem);
};

// const update = async (req, res) => {
//   try {
//     await updateOrder(req.body);
//   } catch (err) {
//     res.status(err.statusCode || 500).send(err.message || 'Internal Server Error');
//   }
//   res.status(200).end();
// };

const remove = async (req, res) => {
  try {
    await removeOrderItem(req.body);
  } catch (err) {
    res.status(err.statusCode || 500).send(err.message || 'Internal Server Error');
  }
  res.status(200).end();
};

module.exports = {
  get,
  getById,
  create,
  remove,
  // update,
};
