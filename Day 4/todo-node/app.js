const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path')
const bodyParser = require('body-parser');

//add static files
app.use(express.static('/public'));
app.use(bodyParser.json())

// Apply Middleware
app.use((req, res, next) => {
  const data = `REQUEST - ${req.method} - ${req.url} - ${new Date()} \n`
  fs.appendFile('error.log', data, (err, log) => {
    if(err) throw err;
    next();
  })
})

// Set views and vies engine
app.set('views', './views')
app.set('view engine', 'pug')

app.route('/')
  .get((req, res) => {
    res.render('index', { title: 'Hey', message: 'Hello there!' })
  }).post((req, res) => {
    console.log(req.body);
    res.send(req.body)
  })

app.listen(8080, () => {
  console.log(`Server is running on http://localhost:8080`);
})