/* eslint-disable no-undef */
const axios = require('axios');
const Chance = require('chance');
const md5 = require('md5');

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

const chance = new Chance();

const randomUser = {
  email: chance.email(),
  telefone: chance.phone({ country: 'br', mobile: true, formatted: false }),
  senha: chance.string(),
  nome: chance.name(),
};

const randomUpdatedUser = {
  email: randomUser.email,
  senha: chance.string(),
  nome: chance.name(),
  telefone: chance.phone({ country: 'br', mobile: true, formatted: false }),
};

describe(('Smoke Tests'), () => {
  test('GET /health', async () => {
    const response = await api.get('/health');
    expect(response.status).toEqual(200);
  });
});

describe(('User CRUD Tests'), () => {
  describe(('Success Responses'), () => {
    test('CREATE /user', async () => {
      const response = await api.post('/api/users', randomUser);
      expect(response.status).toEqual(200);
    });
    test('GET single /user', async () => {
      const response = await api.get('/api/users', {
        params: {
          email: randomUser.email,
        },
      });
      expect(response.status).toEqual(200);
      expect(response.data).toMatchObject({
        ...randomUser,
        senha: md5(randomUser.senha),
      });
    });
    test('GET /user', async () => {
      const response = await api.get('/api/users');
      expect(response.status).toEqual(200);
      expect(response.data).toEqual(
        expect.arrayContaining([{
          ...randomUser,
          senha: md5(randomUser.senha),
          status: 'ativo',
          cep: null,
        }]),
      );
    });
    test('UPDATE /user', async () => {
      const response = await api.put('/api/users', randomUpdatedUser);
      expect(response.status).toEqual(200);
    });
    test('GET single updated /user', async () => {
      const response = await api.get('/api/users', {
        params: {
          email: randomUser.email,
        },
      });
      expect(response.status).toEqual(200);
      expect(response.data).toMatchObject({
        ...randomUpdatedUser,
        senha: md5(randomUpdatedUser.senha),
      });
    });
    test('DELETE /user', async () => {
      const response = await api.delete('/api/users', { data: { email: randomUser.email } });
      expect(response.status).toEqual(200);
    });
    test('GET single deleted /user', async () => {
      const response = await api.get('/api/users', {
        params: {
          email: randomUser.email,
        },
      });
      expect(response.status).toEqual(200);
      expect(response.data).toMatchObject({
        ...randomUpdatedUser,
        senha: md5(randomUpdatedUser.senha),
        status: 'inativo',
      });
    });
  });
  describe(('Error Responses'), () => {
    test('CREATE /user', async () => {
      try {
        await api.post('/api/users', randomUser);
        fail('Expected failure response');
      } catch (err) {
        expect(err.response.status).toEqual(409);
      }
    });
    test('DELETE /user', async () => {
      try {
        await api.delete('/api/users', { data: { email: randomUser.email } });
        fail('Expected failure response');
      } catch (err) {
        expect(err.response.status).toEqual(403);
      }
    });
    test('GET /user', async () => {
      try {
        await api.get('/api/users', {
          params: {
            email: chance.email(),
          },
        });
        fail('Expected failure response');
      } catch (err) {
        expect(err.response.status).toEqual(404);
      }
    });
  });
});
