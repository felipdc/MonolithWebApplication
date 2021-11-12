const applyExtraSetup = (sequelize) => {
  const {
    cupom, usuario, pedido, usocupom, itempedido, parcelapagamento, produto,
  } = sequelize.models;

  usuario.hasMany(pedido);
  usuario.hasMany(usocupom);

  cupom.hasMany(usocupom);
  cupom.hasMany(pedido);

  pedido.hasMany(parcelapagamento);
  pedido.hasMany(itempedido);
  pedido.belongsTo(usuario);
  pedido.belongsTo(cupom);

  usocupom.belongsTo(cupom);
  usocupom.belongsTo(usuario);

  produto.hasMany(itempedido);
};

module.exports = applyExtraSetup;
