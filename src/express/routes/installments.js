const { models } = require('../../sequelize');
const {
  createInstallment,
  getInstallment,
  updateInstallment,
} = require('../controllers/installment');

const get = async (req, res) => {
  if (req.query.id || req.query.where) {
    const installment = await getInstallment(req.query);
    res.status(200).json(installment);
  } else {
    const installments = await models.parcelapagamento.findAll();
    res.status(200).json(installments);
  }
};

const create = async (req, res) => {
  try {
    await createInstallment(req.body);
  } catch (err) {
    res.status(err.statusCode || 500).send(err.message || 'Internal Server Error');
  }
  res.status(200).end();
};

const update = async (req, res) => {
  try {
    await updateInstallment(req.body);
  } catch (err) {
    res.status(err.statusCode || 500).send(err.message || 'Internal Server Error');
  }
  res.status(200).end();
};

module.exports = {
  get,
  create,
  update,
};
