const express = require('express');
const router = express.Router();

const users = require('../data/users');

router.get('/', (req, res) => {
  res.json(users);
});

router.get('/:user', (req, res) => {
  res.json(users.find(user => user.userName === req.params.user));  
});

router.post('/login', (req, res) => {
  if(users.find(user => user.email === req.body.email && user.password === req.body.password)){
    res.json(
      {
        ...users.find(user => user.email === req.body.email && user.password === req.body.password),
        message: 'Login successful',
        isAuthenticated: true
      }
    );
  }
  else{
    res.json({message: 'Login failed', isAuthenticated: false});
  }
});

module.exports = router;