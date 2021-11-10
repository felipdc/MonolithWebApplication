const { models } = require('../../sequelize');
const { getIdParam } = require('../helpers/helpers');
const { createProduct, updateProduct } = require('../controllers/product');

const getAll = async (_req, res) => {
  const products = await models.produto.findAll();
  res.status(200).json(products);
};

const getById = async (req, res) => {
  const id = getIdParam(req);
  const product = await models.produto.findByPk(id);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).send('404 - Not found');
  }
};

const create = async (req, res) => {
  try {
    await createProduct(req.body);
  } catch (err) {
    res.status(err.statusCode || 500).send(err.message || 'Internal Server Error');
  }
  res.status(200).end();
};

const update = async (req, res) => {
  try {
    await updateProduct(req.body);
  } catch (err) {
    res.status(err.statusCode || 500).send(err.message || 'Internal Server Error');
  }
  res.status(200).end();
};

// const remove = async (req, res) => {
//   const id = getIdParam(req);
//   await models.user.destroy({
//     where: {
//       id,
//     },
//   });
//   res.status(200).end();
// };

module.exports = {
  getAll,
  getById,
  create,
  update,
  // remove,
};
