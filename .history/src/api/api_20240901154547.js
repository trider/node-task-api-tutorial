const express = require('express');
const router = express.Router();
const users = require('../data/users');
const tasks = require('../data/tasks');


router.get('/users', function(req, res){
   console.log(users.users)
   res.json(users);
});

router.get('/users/:user', function(req, res){
   const val = users.filter((user) => user.userName ===user )[0]
   res.json(val);
});

router.get('/task', function(req, res){
   users.filter((user) => user.userName ===user )[0]
   res.json(users);
});





//export this router to use in our index.js
module.exports = router;