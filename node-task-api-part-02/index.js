const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const users = require('./data/users');

app.use((req, res, next) => {
 console.log(`${req.method} ${req.url}`);
 next();
});


app.get('/', (req, res) => {
  res.redirect('/api/users');
});

app.get('/api/users', (req, res) => {
  res.json(users);
});

app.get('/api/users/:user', (req, res) => {
  res.json(users.find(user => user.userName === req.params.user));  
});

app.post('/api/users/login', (req, res) => {
  if(users.find(user => user.email === req.body.email && user.password === req.body.password)){
    res.json({
        ...users.find(user => user.email === req.body.email && user.password === req.body.password),
        message: 'Login successful',
        isAuthenticated: true
      });
  }
  else{
    res.json({message: 'Login failed', isAuthenticated: false});
  }
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});