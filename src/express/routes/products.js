const { models } = require('../../sequelize');
const { getIdParam } = require('../helpers/helpers');
const {
  createProduct, updateProduct, getProduct, removeProduct,
} = require('../controllers/product');

const get = async (_req, res) => {
  const products = await models.produto.findAll();
  res.status(200).json(products);
};

const getById = async (req, res) => {
  const id = getIdParam(req);
  const product = await getProduct(id);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).send('404 - Not found');
  }
};

const create = async (req, res) => {
  let product;
  try {
    product = await createProduct(req.body);
  } catch (err) {
    res.status(err.statusCode || 500).send(err.message || 'Internal Server Error');
  }
  res.status(200).json(product);
};

const update = async (req, res) => {
  let product;
  try {
    product = await updateProduct(req.body);
  } catch (err) {
    res.status(err.statusCode || 500).send(err.message || 'Internal Server Error');
  }
  res.status(200).json(product);
};

const remove = async (req, res) => {
  let product;
  try {
    product = await removeProduct(req.body);
  } catch (err) {
    res.status(err.statusCode || 500).send(err.message || 'Internal Server Error');
  }
  res.status(200).json(product);
};

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
};
