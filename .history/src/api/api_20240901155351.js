const express = require('express');
const router = express.Router();
const users = require('../data/users');
const tasks = require('../data/tasks');


router.get('/users', function(req, res){
   res.json(users);
});

router.get('/users/:user', function(req, res){
   res.json( users.filter((user) => user.userName === req.params.user )[0]);
});

router.get('/tasks/user/:userName', function(req, res){
   res.json(tasks.filter((task) => task.user === req.params.userName));
});

router.get('/tasks/tasks/:id', function(req, res){
   res.json(tasks.filter((task) => task.taskId === req.params.id)[0]);
});





//export this router to use in our index.js
module.exports = router;