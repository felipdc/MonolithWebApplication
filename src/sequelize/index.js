const { Sequelize } = require('sequelize');
const applyExtraSetup = require('./extra-setup');

const modelDefiners = [
  require('./models/cupom.model'),
  require('./models/itempedido.model'),
  require('./models/parcelapagamento.model'),
  require('./models/pedido.model'),
  require('./models/produto.model'),
  require('./models/usocupom.model'),
  require('./models/usuario.model'),
];

const sequelize = new Sequelize('postgres', 'postgres', 'password', {
  host: 'localhost',
  dialect: 'postgres',
});

modelDefiners.forEach((modelDefiner) => {
  modelDefiner(sequelize);
});

applyExtraSetup(sequelize);

module.exports = sequelize;
