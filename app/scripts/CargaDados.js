var mongoose = require('mongoose');
var co       = require('co');
var Produto  = require('../models/produto');
var User  = require('../models/user');
var config = require('../../config');

mongoose.connect(config.database);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error db:'));

co(function* processarCargas(){

  //cria o usuário
  var usuario = {username: 'adm', password:'123'};
  var novoUsuario = new User(usuario);
  yield novoUsuario.save();

  //cria os produtos
  var produtos = [
    {
      nome: "Produto 1",
      codigo: 1
    },
    {
      nome: "Produto 2",
      codigo: 2
    },
  ];

  for(var i = 0; i < produtos.length; i++){
    var novoProduto = new Produto(produtos[i]);
    yield novoProduto.save();
  };

  return 'sa';
}).then(function(sasa){
  console.log(sasa);
}).catch(function(err){
  console.log(err);
});




