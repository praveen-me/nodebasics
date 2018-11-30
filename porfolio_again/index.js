// Importing Modules
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

// Appling middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./'))

app.set('views', './views');
app.set('view engine', 'pug');

function renderFile(fileName, res) {
  return res.sendFile(path.join(__dirname+`/${fileName}`));
}

app.get('/', (req, res) => {
  res.send('All files served.');
})

app.get('/list', (req, res) => {
  let data = fs.readFileSync('./data.json');

  dataArr = JSON.parse(String(data));
  res.send(dataArr)
})

app.get('/list/:name', (req, res) => {
  let username = req.params.name;
  console.log(username)
  let data = fs.readFileSync('./data.json');
  dataArr = JSON.parse(String(data));  

  let match = new RegExp(username, 'i');
  console.log(dataArr)
  let userData = dataArr.filter(data => match.test(data.name));

  res.render('about', {name: userData[0].name , email: userData[0].email, message : userData[0].message })  

})

app.route('/contact').get((req, res) => {
  renderFile('contact.html', res);
}).post( (req, res) => {
  let userInfo = req.body;
  let dataArr;
  let data = fs.readFileSync('./data.json');

  dataArr = JSON.parse(String(data));
  
  dataArr.push(userInfo);
  
  console.log(dataArr);
  fs.writeFile('./data.json', JSON.stringify(dataArr), (err) => {
    if(err) throw err;
    console.log("File written")
  })

  res.send(userInfo)
})

app.get('/about', (req, res) => {
  renderFile('about.html', res)
})

app.listen(8800, () => {
  console.log(`Server running at http://localhost:8800`);
})