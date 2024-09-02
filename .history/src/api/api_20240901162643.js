const express = require('express');
const router = express.Router();
const users = require('../data/users');
const tasks = require('../data/tasks');


router.get('/users', function(req, res){
   const getData = new Promise((resolve) => {
      dataSources.mongoAPI.getItemsData(
        { db: 'tasksDB', collection: 'users', query: {  } }
      ).then((data, err) => resolve(data))
    }).then((data) => {
      return res.json(data)

    })
    return getData.then(data => data).catch((err) => console.log(err))
});

router.get('/users/:user', function(req, res){
   res.json( users.filter((user) => user.userName === req.params.user )[0]);
});

router.get('/tasks/user/:userName', function(req, res){
   res.json(tasks.filter((task) => task.user === req.params.userName));
});

router.get('/tasks/task/:id', function(req, res){
   console.log(req.params.id);
   res.json(tasks.filter((task) => task.taskId === parseInt(req.params.id))[0]);
});





//export this router to use in our index.js
module.exports = router;