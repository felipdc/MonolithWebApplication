const { models } = require('../../sequelize');

const getAll = async (req, res) => {
  const users = await models.usuario.findAll();
  res.status(200).json(users);
};

const getByEmail = async (req, res) => {
  const { email } = req.params;
  const user = await models.user.findByPk(email);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).send('404 - Not found');
  }
};

const create = async (req, res) => {
  await models.user.create(req.body);
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
  getByEmail,
  create,
  // update,
  // remove,
};
