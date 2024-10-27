const express = require('express');
const router = express.Router();
const mongoAPI = require('./mongo');

router.get('/user/:user',  (req, res) =>{
   const getData = new Promise((resolve) => {
      mongoAPI.getItems(
        { db: 'tasksDB', collection: 'tasks', query: { user: req.params.user, isActive:true } }
      ).then((data, err) => resolve(data))
    }).then((data) => {
      return res.json(data)

    })
    return getData.then(data => data).catch((err) => console.log(err))
});

router.get('/task/:taskId',  (req, res) =>{
   const getData = new Promise((resolve) => {
      mongoAPI.getItem(
        { db: 'tasksDB', collection: 'tasks', query: { taskId:parseInt(req.params.taskId)} }
      ).then((data, err) => resolve(data))
    }).then((data) => {
      return res.json(data)

    })
    return getData.then(data => data).catch((err) => console.log(err))
});

router.post('/add', (req, res) => {
   let tasks = null
      let taskId = null
      const getData = new Promise((resolve) => {
        mongoAPI.getItems(
          { db: 'tasksDB', collection: 'tasks', query: {} }
        ).then((data, err) => resolve(data))

      }).then((data) => {
        tasks = data
        taskId = tasks.length + 1
        return mongoAPI.writeItem({
          db: 'tasksDB',
          collection: 'tasks',
          data: {
            ...req.body,
            taskId: taskId,
            added: new Date(),
            updated: new Date(),
            isActive: true

          }
        })
      }).then((data) => {
        return mongoAPI.getItem(
          { db: 'tasksDB', collection: 'tasks', query: { "taskId": taskId } }
        )
      }).then((data) => {
          return res.json(data)
      })
      return getData.then(data => data).catch((err) => {
        console.log(err)
      })


  
});

router.post('/update/:taskId', (req, res) => {
   const getData = new Promise((resolve) => {
      mongoAPI.updateItem(
        { db: 'tasksDB', collection: 'tasks', query: { taskId: req.params.taskId }, data: req.body }
      ).then((data, err) => resolve(data))
    }).then((data) => {

      return mongoAPI.getItem(
        { db: 'tasksDB', collection: 'tasks', query: { taskId: parseInt(req.params.taskId) } }
      )
    }).then((data) => {

      return res.json(data)

    })
    return getData.then(data => data).catch((err) => console.log(err))
});

router.post('/delete', (req, res) => {
  const getData = new Promise((resolve) => {
    mongoAPI.updateItem(
      {
        db: 'tasksDB',
        collection: 'tasks',
        query: { "taskId": req.body.taskId },
        data: {
          isActive: false,
          updated: new Date()
        }
      }
    ).then((data, err) => resolve(data))
  }).then((data) => {
    return mongoAPI.getItem(
      { db: 'tasksDB', collection: 'tasks', query: { "taskId": parseInt(req.body.taskId)} }
    )
  }).then((data) => {

    return res.json(data)
  })
  return getData.then(data => data).catch((err) => {
    console.log(err)
  })
});

module.exports = router;