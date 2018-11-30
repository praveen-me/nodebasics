const express = require('express');

const app = express();

app.use(express.static('./'))

app.get('/', (req, res) => {
  res.send('All files served.');
})

app.get('/contact', (req, res) => {
  app.use(express.static('./contact'))
})

app.listen(5000, () => {
  console.log(`Server running at http://localhost:5000`);
})