const { models } = require('../../sequelize');
const {
  createCoupon,
  updateCoupon,
  getCoupon,
} = require('../controllers/coupon');

const get = async (req, res) => {
  let coupons;
  if (req.query.codigo) {
    coupons = await getCoupon(req.query.codigo);
    if (!coupons) {
      res.status(404).send('404 - Coupon not found');
    } else {
      res.status(200).json(coupons);
    }
  } else {
    coupons = await models.cupom.findAll();
    res.status(200).json(coupons);
  }
};

const getById = async (req, res) => {
  const code = req.body.codigo;
  const coupon = await getCoupon(code);
  if (coupon) {
    res.status(200).json(coupon);
  } else {
    res.status(404).send('404 - Not found');
  }
};

const create = async (req, res) => {
  let coupon;
  try {
    coupon = await createCoupon(req.body);
  } catch (err) {
    res.status(err.statusCode || 500).send(err.message || 'Internal Server Error');
  }
  res.status(200).send(coupon);
};

const update = async (req, res) => {
  let coupon;
  try {
    coupon = await updateCoupon(req.body);
  } catch (err) {
    res.status(err.statusCode || 500).send(err.message || 'Internal Server Error');
  }
  res.status(200).send(coupon);
};

// const remove = async (req, res) => {
//   try {
//     await removeProduct(req.body);
//   } catch (err) {
//     res.status(err.statusCode || 500).send(err.message || 'Internal Server Error');
//   }
//   res.status(200).end();
// };

module.exports = {
  get,
  getById,
  create,
  update,
  // remove,
};
