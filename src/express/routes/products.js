const { models } = require('../../sequelize');
const { getIdParam } = require('../helpers');

const getAll = async (req, res) => {
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
  await models.produto.create(req.body);
  res.status(201).end();
};

// const update = async (req, res) => {
//   const id = getIdParam(req);

//   // We only accept an UPDATE request if the `:id` param matches the body `id`
//   if (req.body.id === id) {
//     await models.user.update(req.body, {
//       where: {
//         id,
//       },
//     });
//     res.status(200).end();
//   } else {
//     res.status(400).send(`Bad request: param ID
// (${id}) does not match body ID (${req.body.id}).`);
//   }
// };

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
  // update,
  // remove,
};
