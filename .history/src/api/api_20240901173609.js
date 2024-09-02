const express = require('express');
const router = express.Router();


const mongoAPI = require('./utils/mongo');
router.use('/users', require('./utils/users'));
router.use('/tasks', require('./utils/tasks'));


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