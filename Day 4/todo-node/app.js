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
  todo : String
})

const Todo = mongoose.model('Todo', todoSchema);

//Setting view engine
app.set('views', './views')
app.set('view engine', 'pug')

//Setting middleware
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static('/public'))

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
    console.log(data);   
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
    console.log('data saved');
    res.redirect("/");
  });
})

// app.post('/',(req, res) => {
//   let item = req.body;
//   item.done = false;name
//   console.log(item);  

//   let newTodo = new Todo(item);

//   newTodo.save((err, savedData) => {
//     console.log("submitted")
//   })
//   Todo.find({}, (err, data) => {
//     console.log(data);   
// res  })
// })

app.listen(8080, () => {
  console.log(`Port running on http://localhost:8080`)
})