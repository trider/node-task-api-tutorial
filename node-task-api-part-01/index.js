const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const users = require('./data/users');

app.use((req, res, next) => {
 console.log(`${req.method} ${req.url}`);
 next();
});

app.get('/', function(req, res){
  res.redirect('/users');
});

app.get('/users', function(req, res){
  res.json(users);
});


// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});