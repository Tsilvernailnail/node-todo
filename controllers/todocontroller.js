var bodyParser = require('body-parser');
var mongoose = require('mongoose')

// connect to mongodb database
mongoose.connect('mongodb://user1:password@ds119370.mlab.com:19370/todo');

//creating schema
var todoSchema = new mongoose.Schema({
  item: String
});

var Todo = mongoose.model('Todo', todoSchema);



var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app){

  app.get('/todo', function(req, res){
    //get data from monogdb and pass it to view
    Todo.find({}, function(err,data){
      if (err) throw err;
      res.render('todo', {todos: data});
    });


  });

  app.post('/todo', urlencodedParser, function(req, res){
    //get data from view and add it to the monogodb
    var newTodo = Todo(req.body).save(function(err, data){
      if (err) throw err;
      res.json(data);
    });


  });

  app.delete('/todo/:item', function(req, res){
    //delete requested item from mongodb
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
      if (err) throw err;
      res.json(data);
    });
  });

};
