const { models } = require('../../sequelize');
const {
  createCouponUsage,
  getCouponUsage,
  removeCouponUsage,
} = require('../controllers/couponUsage');

const get = async (req, res) => {
  if (req.query.cupomCodigo && req.query.usuarioEmail) {
    const couponUsage = await getCouponUsage(req.query);
    if (!couponUsage) {
      res.status(404).send('404 - Coupon not found');
    } else {
      res.status(200).json(couponUsage);
    }
  } else {
    const couponUsages = await models.usocupom.findAll();
    res.status(200).json(couponUsages);
  }
};

const create = async (req, res) => {
  try {
    await createCouponUsage(req.body);
  } catch (err) {
    res.status(err.statusCode || 500).send(err.message || 'Internal Server Error');
  }
  res.status(200).end();
};

const remove = async (req, res) => {
  try {
    await removeCouponUsage(req.body);
  } catch (err) {
    res.status(err.statusCode || 500).send(err.message || 'Internal Server Error');
  }
  res.status(200).end();
};

module.exports = {
  get,
  create,
  remove,
};
