const express = require('express');
const router = express.Router();
const users = require('../data/users');
const tasks = require('../data/tasks');
const { MongoClient } = require('mongodb');

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */



router.get('/users', function(req, res){
   const filter = {};
const client = await MongoClient.connect(
  'mongodb://localhost:27017/'
);
const coll = client.db('tasksDB').collection('users');
const cursor = coll.find(filter);
const result = await cursor.toArray();
await client.close();
   res.json(users);
});

router.get('/users/:user', function(req, res){
   res.json( users.filter((user) => user.userName === req.params.user )[0]);
});

router.get('/tasks/user/:userName', function(req, res){
   res.json(tasks.filter((task) => task.user === req.params.userName));
});

router.get('/tasks/task/:id', function(req, res){
   res.json(tasks.filter((task) => task.taskId === parseInt(req.params.id))[0]);
});





//export this router to use in our index.js
module.exports = router;