const express = require('express');
const router = express.Router();
const mongoAPI = require('./mongo');


router.get('/user/:userName', function(req, res){
   const getData = new Promise((resolve) => {
      mongoAPI.getItemsData(
        { db: 'tasksDB', collection: 'tasks', query: { user: req.params.userName, isActive:true } }
      ).then((data, err) => resolve(data))
    }).then((data) => {
      return res.json(data)

    })
    return getData.then(data => data).catch((err) => console.log(err))
});

router.get('/task/:id', function(req, res){
   const getData = new Promise((resolve) => {
      mongoAPI.getItemData(
        { db: 'tasksDB', collection: 'tasks', query: { taskId:parseInt(req.params.id)} }
      ).then((data, err) => resolve(data))
    }).then((data) => {
      return res.json(data)

    })
    return getData.then(data => data).catch((err) => console.log(err))
});

router.post('/task/create', function(req, res){
  let tasks = null
  let taskId = null
  const getData = new Promise((resolve) => {
    dataSources.mongoAPI.getItemsData(
      { db: 'tasksDB', collection: 'tasks', query: {} }
    ).then((data, err) => resolve(data))

  }).then((data) => {
    tasks = data
    taskId = tasks.length + 1
    return dataSources.mongoAPI.writeItemData({
      db: 'tasksDB',
      collection: 'tasks',
      data: {
        ...args.payload,
        taskId: taskId,
        added: new Date(),
        updated: new Date(),
        isActive: true

      }
    })
  }).then((data) => {
    return dataSources.mongoAPI.getItemData(
      { db: 'tasksDB', collection: 'tasks', query: { "taskId": taskId } }
    )
  })
  return getData.then(data => data).catch((err) => {
    console.log(err)
  })
},

  
});







//export this router to use in our index.js
module.exports = router;