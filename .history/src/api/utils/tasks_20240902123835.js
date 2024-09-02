const express = require('express');
const router = express.Router();
const mongoAPI = require('./mongo');


router.get('/user/:userName',  (req, res) =>{
   const getData = new Promise((resolve) => {
      mongoAPI.getItemsData(
        { db: 'tasksDB', collection: 'tasks', query: { user: req.params.userName, isActive:true } }
      ).then((data, err) => resolve(data))
    }).then((data) => {
      return res.json(data)

    })
    return getData.then(data => data).catch((err) => console.log(err))
});

router.get('/task/:id',  (req, res) =>{
   const getData = new Promise((resolve) => {
      mongoAPI.getItemData(
        { db: 'tasksDB', collection: 'tasks', query: { taskId:parseInt(req.params.id)} }
      ).then((data, err) => resolve(data))
    }).then((data) => {
      return res.json(data)

    })
    return getData.then(data => data).catch((err) => console.log(err))
});

router.post('/create', (req, res) => {
   let tasks = null
      let taskId = null
      const getData = new Promise((resolve) => {
        mongoAPI.getItemsData(
          { db: 'tasksDB', collection: 'tasks', query: {} }
        ).then((data, err) => resolve(data))

      }).then((data) => {
        tasks = data
        taskId = tasks.length + 1
        return mongoAPI.writeItemData({
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
        return mongoAPI.getItemData(
          { db: 'tasksDB', collection: 'tasks', query: { "taskId": taskId } }
        )
      }).then((data) => {
          return res.json(data)
      })
      return getData.then(data => data).catch((err) => {
        console.log(err)
      })


  
});
router.post('/update', (req, res) => {
   const getData = new Promise((resolve) => {
      mongoAPI.updateItemData(
        { db: 'tasksDB', collection: 'tasks', query: { taskId: req.body.taskId }, data: req.body }
      ).then((data, err) => resolve(data))
    }).then((data) => {

      console.log(data.result)
      return mongoAPI.getItemData(
        { db: 'tasksDB', collection: 'tasks', query: { taskId: req.body.taskId } }
      )
    }).then((data) => {

      return res.json(data)

    })
    return getData.then(data => data).catch((err) => console.log(err))
});
router.post('/delete', (req, res) => {
  const getData = new Promise((resolve) => {
    console.log(req.body)
    mongoAPI.updateItemData(
      {
        db: 'tasksDB',
        collection: 'tasks',
        query: { "taskId": 4 },
        data: {
          isActive: false,
          updated: new Date()
        }
      }
    ).then((data, err) => resolve(data))
  }).then((data) => {
    console.log(data.result)
    return mongoAPI.getItemData(
      { db: 'tasksDB', collection: 'tasks', query: { "tasksId": parseInt(req.body.taskId)} }
    )
  }).then((data) => {

    return res.json(data)
  })
  return getData.then(data => data).catch((err) => {
    console.log(err)
  })
});





module.exports = router;