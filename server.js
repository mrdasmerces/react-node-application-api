var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var config = require('./config.js');
var utils = require('./app/scripts/utils');
var User = require('./app/models/user');
var Produto = require('./app/models/produto');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.listen(config.port, function () {
  console.log('Running on port ' + config.port);

mongoose.connect(config.database);

  //conexão no mongoDB
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log('Conectado ao MongoDB.');
  });
});

app.route('/user')
  .post(function (req, res) {
  //busca o usuário e a senha correspondente
  User.findOne({username: req.body.usuarioLogin.username, password:req.body.usuarioLogin.password})
  .exec(function(err, user) {
    if (err) throw err;
    if (!user) {
        return res.status(404).json({
            error: true,
            message: 'Usuário ou senha incorretas.'
          });
    }
    //gera o token
    var token = utils.generateToken(user);
        res.send({
          user: user,    
          token: token
        });
   });
  });

app.route('/produtos')
  .get(function (req, res) {
    var produtos = Produto.find().exec();

    res.send(produtos);
  })

module.exports =  app;