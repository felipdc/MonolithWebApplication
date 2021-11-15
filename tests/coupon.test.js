/* eslint-disable no-undef */
const axios = require('axios');
const Chance = require('chance');

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

const chance = new Chance();

const randomCoupon = {
  codigo: chance.string({ casing: 'upper' }),
  descricao: chance.sentence(),
  tipodesconto: chance.weighted(['absoluto', 'porcentagem'], [50, 50]),
  status: 'ativo',
};
randomCoupon.desconto = randomCoupon.tipodesconto === 'absoluto' ? chance.integer({ min: 500, max: 10000 }) : chance.integer({ min: 10, max: 50 });

describe(('Product CRUD Tests'), () => {
  describe(('Success Responses'), () => {
    test('CREATE /coupons', async () => {
      const response = await api.post('/api/coupons', randomCoupon);
      expect(response.status).toEqual(200);
      expect(response.data).toMatchObject({
        ...randomCoupon,
      });
    });
    test('GET single /coupons', async () => {
      const response = await api.get('/api/coupons', {
        params: {
          codigo: randomCoupon.codigo,
        },
      });
      expect(response.status).toEqual(200);
      expect(response.data).toMatchObject({
        ...randomCoupon,
      });
    });
    test('GET all /coupons', async () => {
      const response = await api.get('/api/coupons');
      expect(response.status).toEqual(200);
      expect(response.data).toEqual(
        expect.arrayContaining([{
          ...randomCoupon,
          status: 'ativo',
          validade: null,
        }]),
      );
    });
    test('UPDATE /coupons', async () => {
      const response = await api.put('/api/coupons', {
        ...randomCoupon,
        status: 'inativo',
      });
      expect(response.status).toEqual(200);
      expect(response.data).toMatchObject({
        ...randomCoupon,
        status: 'inativo',
      });
    });
  });
  describe(('Error Responses'), () => {
    test('GET /coupons', async () => {
      try {
        await api.get('/api/coupons', {
          params: {
            codigo: chance.string(),
          },
        });
        fail('Expected failure response');
      } catch (err) {
        console.log(err);
        expect(err.response.status).toEqual(404);
      }
    });
  });
});
