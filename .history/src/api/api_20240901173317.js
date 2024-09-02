const express = require('express');
const router = express.Router();
const users = require('./utils/users');

const mongoAPI = require('./utils/mongo');

router.get('/users', function(req, res){
   const getData = new Promise((resolve) => {
      mongoAPI.getItemsData({ db: 'tasksDB', collection: 'users', query: {  } }
    ).then((data, err) => resolve(data))
    }).then((data) => {
      return res.json(data)

    })
    return getData.then(data => data).catch((err) => console.log(err))
});

router.get('/users/:user', function(req, res){
   const getData = new Promise((resolve) => {
      mongoAPI.getItemData(
        { db: 'tasksDB', collection: 'users', query: { "userName": req.params.user } }
      ).then((data, err) => resolve(data))
    }).then((data) => {
      return res.json(data)

    })
    return getData.then(data => data).catch((err) => console.log(err))
});

router.post('/users', function(req, res){
   const getData = new Promise((resolve) => {
      mongoAPI.addItemData(
        { db: 'login', collection: 'users', query: req.body }
      ).then((data, err) => resolve(data))
    }).then((data) => {
      return res.json(data)

    })
    return getData.then(data => data).catch((err) => console.log(err))
});

router.get('/tasks/user/:userName', function(req, res){
   const getData = new Promise((resolve) => {
      mongoAPI.getItemsData(
        { db: 'tasksDB', collection: 'tasks', query: { user: req.params.userName, isActive:true } }
      ).then((data, err) => resolve(data))
    }).then((data) => {
      return res.json(data)

    })
    return getData.then(data => data).catch((err) => console.log(err))
});

router.get('/tasks/task/:id', function(req, res){
   const getData = new Promise((resolve) => {
      mongoAPI.getItemData(
        { db: 'tasksDB', collection: 'tasks', query: { taskId:parseInt(req.params.id)} }
      ).then((data, err) => resolve(data))
    }).then((data) => {
      return res.json(data)

    })
    return getData.then(data => data).catch((err) => console.log(err))
});







//export this router to use in our index.js
module.exports = router;