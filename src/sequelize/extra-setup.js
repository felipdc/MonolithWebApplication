const applyExtraSetup = (sequelize) => {
  const {
    cupom, usuario, pedido, usocupom, detalhespedido, parcelapagamento, produto,
  } = sequelize.models;

  usuario.hasMany(pedido);
  usuario.hasMany(usocupom);

  cupom.hasMany(usocupom);
  cupom.hasMany(pedido);

  pedido.hasMany(parcelapagamento);
  pedido.hasMany(detalhespedido);
  pedido.belongsTo(usuario);

  produto.hasMany(detalhespedido);
};

module.exports = applyExtraSetup;
