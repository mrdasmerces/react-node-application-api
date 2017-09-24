var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.listen(3000, function () {
  console.log('Running on port 3000');
});

app.route('/user')
  .get(function (req, res) {
      res.send(tasks);
  })
  .post(function (req, res) {
      var task = req.body.task;
      tasks.push({taskName: task});
      res.send(tasks);
  });

app.route('/tasks/:taskId')
  .delete(function (req, res) {
      var index = parseInt(req.params.taskId);
      tasks.splice(index, 1);
      res.send(tasks);
  })

module.exports =  app;