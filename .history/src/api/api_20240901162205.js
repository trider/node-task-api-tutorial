const express = require('express');
const router = express.Router();
const users = require('../data/users');
const tasks = require('../data/tasks');
const mongoAPI = require('./mongo');
const config = require('../../config/config.json')
const { MongoClient, ObjectId } = require("mongodb");
const bodyParser = require('body-parser');


const app = express();
const port = 3000;

// MongoDB connection URL
const url = 'mongodb://localhost:27017';
const dbName = 'tasksDB';
let db;

// Connect to MongoDB


// Middleware
router.use(bodyParser.json());

// Basic route



router.get('/users', function(req, res){
   
   MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
      if (err) return console.error(err);
      db = client.db(dbName);
      console.log(`Connected to database: ${dbName}`);
  });
    
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