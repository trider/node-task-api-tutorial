const express = require('express');
const router = express.Router();
const users = require('../data/users');
const tasks = require('../data/tasks');
const mongoAPI = require('./mongo');
const config = require('../../config/config.json')
const { MongoClient, ObjectId } = require("mongodb");
const uri = config.urlMongo;


router.get('/users', function(req, res){
   const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect();
    const database = client.db('tasksDB');
    const data = database.collection('tasks');
    data.findOne(args.query).then(resp => {
      res.json(resp)
    }).catch(error => {
      console.log(error)
      // return {status:error}
    });
    client.close()
    
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