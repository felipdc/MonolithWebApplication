/* eslint-disable no-undef */
const axios = require('axios');
const Chance = require('chance');

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

const chance = new Chance();

const randomProduct = {
  nome: chance.word(),
  categoria: chance.word(),
  preço: chance.integer({ min: 500, max: 10000 }),
  quantidade: chance.integer({ min: 1, max: 10 }),
};

let newProduct;

describe(('Product CRUD Tests'), () => {
  describe(('Success Responses'), () => {
    test('CREATE /product', async () => {
      const response = await api.post('/api/products', randomProduct);
      newProduct = response.data;
      expect(response.status).toEqual(200);
      expect(response.data).toMatchObject({
        ...randomProduct,
        status: 'disponível',
      });
    });
    test('GET single /products', async () => {
      const response = await api.get(`/api/products/${newProduct.id}`);
      expect(response.status).toEqual(200);
      expect(response.data).toMatchObject({
        ...randomProduct,
        status: 'disponível',
      });
    });
    test('UPDATE consume /products', async () => {
      const response = await api.put('/api/products', {
        id: newProduct.id,
        quantidade: newProduct.quantidade,
        retirar: true,
      });
      expect(response.status).toEqual(200);
      expect(response.data).toMatchObject({
        ...randomProduct,
        quantidade: 0,
        status: 'indisponível',
      });
    });
    test('UPDATE add /products', async () => {
      const response = await api.put('/api/products', {
        id: newProduct.id,
        quantidade: 20,
      });
      expect(response.status).toEqual(200);
      expect(response.data).toMatchObject({
        ...randomProduct,
        quantidade: 20,
        status: 'disponível',
      });
    });
    test('REMOVE /products', async () => {
      const response = await api.delete('/api/products', {
        data: {
          id: newProduct.id,
        },
      });
      expect(response.status).toEqual(200);
      expect(response.data).toMatchObject({
        ...randomProduct,
        quantidade: 20,
        status: 'inativo',
      });
    });
  });
  describe(('Error Responses'), () => {
    test('GET /product', async () => {
      try {
        await api.get(`/api/products/${999999}`);
        fail('Expected Not Found response');
      } catch (err) {
        expect(err.response.status).toEqual(404);
      }
    });
    test('REMOVE already removed /product', async () => {
      try {
        await api.delete('/api/products', {
          data: {
            id: newProduct.id,
          },
        });
        fail('Expected Not Found response');
      } catch (err) {
        console.log(err);
        expect(err.response.status).toEqual(406);
      }
    });
  });
});
