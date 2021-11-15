/* eslint-disable no-undef */
const axios = require('axios');
const {
  randomAbsoluteCoupon,
  // randomPercentageCoupon,
  randomProduct,
  randomUser,
} = require('./testData');

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

const orderWithAbsoluteCoupon = {
  usuarioEmail: randomUser.email,
  cupomCodigo: randomAbsoluteCoupon.codigo,
};

let newRandomProduct;
beforeAll(async () => {
  await api.post('/api/users', randomUser);
  await api.post('/api/coupons', randomAbsoluteCoupon);
  newRandomProduct = (await api.post('/api/products', randomProduct)).data;
});

describe(('Order Flow Tests'), () => {
  describe(('Order With Absolute Coupon'), () => {
    let newOrderWithAbsoluteCoupon;
    let newInstallments;
    test('CREATE /orders', async () => {
      const response = await api.post('/api/orders', orderWithAbsoluteCoupon);
      newOrderWithAbsoluteCoupon = response.data;
      expect(response.status).toEqual(200);
      expect(response.data).toMatchObject({
        ...orderWithAbsoluteCoupon,
        status: 'incompleto',
      });
    });
    test('GET single /orders', async () => {
      const response = await api.get(`/api/orders/${newOrderWithAbsoluteCoupon.id}`);
      expect(response.status).toEqual(200);
      expect(response.data).toMatchObject({
        ...orderWithAbsoluteCoupon,
        status: 'incompleto',
      });
    });
    test('GET Coupon Usage /orders', async () => {
      const response = await api.get('/api/couponusages', {
        params: {
          usuarioEmail: randomUser.email,
          cupomCodigo: randomAbsoluteCoupon.codigo,
        },
      });
      expect(response.status).toEqual(200);
      expect(response.data).toMatchObject({
        usuarioEmail: newOrderWithAbsoluteCoupon.usuarioEmail,
        cupomCodigo: newOrderWithAbsoluteCoupon.cupomCodigo,
      });
    });
    test('Create Order Item', async () => {
      const newOrderItemParams = {
        pedidoId: newOrderWithAbsoluteCoupon.id,
        produtoId: newRandomProduct.id,
        quantidade: newRandomProduct.quantidade - 1,
      };
      const response = await api.post('/api/orderitems', newOrderItemParams);
      expect(response.status).toEqual(200);
      expect(response.data).toMatchObject(newOrderItemParams);
    });
    test('Check if Product had Quantity Reduced', async () => {
      const response = await api.get(`/api/products/${newRandomProduct.id}`);
      expect(response.status).toEqual(200);
      expect(response.data).toMatchObject({
        ...newRandomProduct,
        quantidade: 1,
      });
    });
    test('Check if Order was Updated', async () => {
      const response = await api.get(`/api/orders/${newOrderWithAbsoluteCoupon.id}`);
      newOrderWithAbsoluteCoupon = response.data;
      expect(response.status).toEqual(200);
      expect(response.data).toMatchObject({
        ...newOrderWithAbsoluteCoupon,
        precototal: newRandomProduct.preço
        * (newRandomProduct.quantidade - 1),
        precofinal: (newRandomProduct.preço
        * (newRandomProduct.quantidade - 1) - randomAbsoluteCoupon.desconto) < 0 ? 0
          : (newRandomProduct.preço
          * (newRandomProduct.quantidade - 1) - randomAbsoluteCoupon.desconto),
      });
    });
    test('Conclude Order', async () => {
      const response = await api.put('/api/orders', {
        id: newOrderWithAbsoluteCoupon.id,
        tipopagamento: 'boleto',
        qtdparcelas: 2,
        concluirPedido: true,
      });
      newOrderWithAbsoluteCoupon = response.data;
      expect(response.status).toEqual(200);
      expect(response.data).toMatchObject({
        ...newOrderWithAbsoluteCoupon,
        tipopagamento: 'boleto',
        qtdparcelas: 2,
        status: 'pagamento pendente',
      });
    });
    test('Check Installments', async () => {
      const response = await api.get('/api/installments', {
        params: {
          where: {
            pedidoId: newOrderWithAbsoluteCoupon.id,
          },
        },
      });
      newInstallments = response.data;
      expect(response.status).toEqual(200);
      expect(response.data).toHaveLength(2);
      expect(response.data[0].valor).toBeCloseTo(newOrderWithAbsoluteCoupon.precofinal / 2, -1);
    });
    test('Pay All Installments', async () => {
      console.log(newInstallments);
      const responseOne = await api.put('/api/installments', {
        id: newInstallments[0].id,
        status: 'aprovado',
      });
      const responseTwo = await api.put('/api/installments', {
        id: newInstallments[1].id,
        status: 'aprovado',
      });
      expect(responseOne.status).toEqual(200);
      expect(responseTwo.status).toEqual(200);
    });
    test('Check if Order is Paid', async () => {
      const response = await api.get(`/api/orders/${newOrderWithAbsoluteCoupon.id}`);
      expect(response.status).toEqual(200);
      expect(response.data.status).toEqual('pago');
    });
  });
});
