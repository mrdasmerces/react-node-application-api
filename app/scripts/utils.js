//Generate Token using secret from process.env.JWT_SECRET
var jwt = require('jsonwebtoken');

var utils = {
  generateToken: function(user) {
    var u = {
    username: user.username,
    _id: user._id.toString()
    };
    return token = jwt.sign(u, 'secret', {
      expiresIn: 60 // expira em 1 minuto
    });
  }
}

module.exports = utils;