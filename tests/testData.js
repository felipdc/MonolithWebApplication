/* eslint-disable import/no-extraneous-dependencies */
const Chance = require('chance');

const chance = new Chance();

const randomAbsoluteCoupon = {
  codigo: chance.string({ casing: 'upper', symbols: false }),
  descricao: chance.sentence(),
  tipodesconto: 'absoluto',
  status: 'ativo',
  desconto: chance.integer({ min: 500, max: 5000 }),
};

const randomPercentageCoupon = {
  codigo: chance.string({ casing: 'upper' }),
  descricao: chance.sentence(),
  tipodesconto: 'porcentagem',
  status: 'ativo',
  desconto: chance.integer({ min: 10, max: 50 }),
};

const randomProduct = {
  nome: chance.word(),
  categoria: chance.word(),
  preço: chance.integer({ min: 5000, max: 10000 }),
  quantidade: chance.integer({ min: 1, max: 10 }),
};

const randomUser = {
  email: chance.email(),
  telefone: chance.phone({ country: 'br', mobile: true, formatted: false }),
  senha: chance.string(),
  nome: chance.name(),
};

module.exports = {
  randomAbsoluteCoupon,
  randomPercentageCoupon,
  randomProduct,
  randomUser,
};
