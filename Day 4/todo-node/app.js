//Importing packages
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');

//connect moongoose
mongoose.connect('mongodb://localhost/todos', (err, connection) => {
  if(err) throw err;
  console.log("Connection Sucessful")
});

const todoSchema = new mongoose.Schema({
  todo : String,
  description : String
})

const Todo = mongoose.model('Todo', todoSchema);

//Setting view engine
app.set('views', './views')
app.set('view engine', 'pug')

//Setting middleware
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static(path.join(__dirname,'public')));

// Method Overriding
app.use((req, res, next) => {
  switch(req.body._method) {
    case "DELETE" : {
      req.method = 'DELETE';
      // req.url = req.path;
      next();
      break;
    }
    case "PUT" : {
      req.method = 'PUT';
      // req.url = req.path;
      next();
      break;
    }
    default : next()
  }
})

// Apply middleware for craeting log
app.use((req, res, next) => {
  let logString = `METHOD => ${req.method} - PATH => ${req.url} ${new Date()}`;
  fs.appendFile('error.log', logString, (err, logSuccess) => {
    if(err) throw err;
    next();
  })
})

//Handling Routes
app.get('/',(req, res) => {

  Todo.find({}, (err, data) => {
    // res.render('index', {todos : data});
    res.render('list', {todos : data});
  })

})

app.get('/todos/new', (req, res) => {
  res.render('add-form');
})

app.post('/todos/new', (req, res) => {
  const item = req.body;
  const newTodo = new Todo({
    ...item
  });
  newTodo.save((err, saveData) => {
    if(err) throw err;
    res.redirect("/");
  });
})

app.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  Todo.find({_id : id}, (err, data) => {
    res.render('edit-form', {todo : data});
  }) 
});

app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  Todo.find({_id : id}, (err, data) => {
    res.render('detail', {todo : data});
  })
})

app.put('/todos/:id/update', (req, res) => {
  let id = req.params.id;
  let data = req.body;
  console.log(data)

  Todo.update({_id : id}, {$set : {...data}}, (err, data) => {
    res.redirect('/')
  })

})

app.delete('/todos/:id/delete', (req, res) => {
  console.log(req.method)
  const id = req.params.id
  console.log(id)
  Todo.deleteOne({_id : id}, (err, data) => {
    res.redirect('/')
  })
})


app.listen(8080, () => {
  console.log(`Port running on http://localhost:8080`)
})