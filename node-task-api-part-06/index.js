const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const api = require('./api/api');

app.use((req, res, next) => {
 console.log(`${req.method} ${req.url}`);
 next();
});

app.get('/', (req, res) => {
  res.redirect('/api');
});


app.use('/api', api);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});