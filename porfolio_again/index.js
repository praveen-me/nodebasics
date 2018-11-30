const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function renderFile(fileName, res) {
  console.log(path)
  return res.sendFile(path.join(__dirname+`/${fileName}`));
}

app.use(express.static('./'))

app.get('/', (req, res) => {
  res.send('All files served.');
})

app.get('/contact', (req, res) => {
  renderFile('contact.html', res);
})

app.get('/about', (req, res) => {
  renderFile('about.html', res)
})

app.post('/contact', (req, res) => {
  console.log(req.body);  
  res.send(req.body);
})

app.listen(5000, () => {
  console.log(`Server running at http://localhost:5000`);
})