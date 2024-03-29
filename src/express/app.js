/* eslint-disable no-restricted-syntax */
const express = require('express');

const routes = {
  users: require('./routes/users'),
  products: require('./routes/products'),
  coupons: require('./routes/coupons'),
  orders: require('./routes/orders'),
  couponusages: require('./routes/couponUsages'),
  orderitems: require('./routes/orderItems'),
  installments: require('./routes/installments'),
};

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const makeHandlerAwareOfAsyncErrors = (handler) => async (req, res, next) => {
  try {
    await handler(req, res);
  } catch (error) {
    next(error);
  }
};

app.get('/health', (req, res) => {
  res.send('OK');
});

for (const [routeName, routeController] of Object.entries(routes)) {
  if (routeController.get) {
    app.get(
      `/api/${routeName}`,
      makeHandlerAwareOfAsyncErrors(routeController.get),
    );
  }
  if (routeController.getById) {
    app.get(
      `/api/${routeName}/:id`,
      makeHandlerAwareOfAsyncErrors(routeController.getById),
    );
  }
  if (routeController.create) {
    app.post(
      `/api/${routeName}`,
      makeHandlerAwareOfAsyncErrors(routeController.create),
    );
  }
  if (routeController.update) {
    app.put(
      `/api/${routeName}`,
      makeHandlerAwareOfAsyncErrors(routeController.update),
    );
  }
  if (routeController.remove) {
    app.delete(
      `/api/${routeName}`,
      makeHandlerAwareOfAsyncErrors(routeController.remove),
    );
  }
}

module.exports = app;
