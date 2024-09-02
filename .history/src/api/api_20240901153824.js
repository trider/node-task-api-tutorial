const express = require('express');
const router = express.Router();
const users = require('../data/users');


router.get('/users', function(req, res){
   console.log(users.users)
   res.json(users);
});

router.get('/users/:user', function(req, res){
   users.filter((user) => user.userName ===user )[0]
   res.json(users);
});





//export this router to use in our index.js
module.exports = router;