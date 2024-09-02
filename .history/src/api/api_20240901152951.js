const express = require('express');
const router = express.Router();
const users = require('../data/users');


router.get('/users', function(req, res){
   res.send(users.users);
});



//export this router to use in our index.js
module.exports = router;