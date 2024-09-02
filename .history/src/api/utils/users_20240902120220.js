const express = require('express');
const router = express.Router();
const mongoAPI = require('./mongo');



router.get('/', function(req, res){
   const getData = new Promise((resolve) => {
      mongoAPI.getItemsData({ db: 'tasksDB', collection: 'users', query: {  } }
    ).then((data, err) => resolve(data))
    }).then((data) => {
      return res.json(data)

    })
    return getData.then(data => data).catch((err) => console.log(err))
});

router.get('/:user', function(req, res){
   const getData = new Promise((resolve) => {
      mongoAPI.getItemData(
        { db: 'tasksDB', collection: 'users', query: { "userName": req.params.user } }
      ).then((data, err) => resolve(data))
    }).then((data) => {
      return res.json(data)

    })
    return getData.then(data => data).catch((err) => console.log(err))
});

router.post('/login', function(req, res){
  const getData = new Promise((resolve) => {
    console.log(req.body)
    mongoAPI.getItemData(
      { db: 'tasksDB', collection: 'users', query: req.body }
    ).then((data, err) => resolve(data))
  }).then((data) => {
    if(data !== null) {
      data = {
        ...data,
        status: "User found",
        isAuthenticated: true
      }

    }
    else{
      data = {
        status: "User not found",
        isAuthenticated: false
      }
    }
    // console.log(data)
    return res.json(data) 

  })
  return getData.then(data => data).catch((err) => console.log(err))
});
router.post('/user/create', function(req, res){
  let users = null
  let userId = null
  const getData = new Promise((resolve) => {
    mongoAPI.getItemsData(
      { db: 'tasksDB', collection: 'users', query: {} }
    ).then((data, err) => resolve(data))

  }).then((data) => {
    users = data
    userId = users.length + 1
    return mongoAPI.writeItemData({
      db: 'tasksDB',
      collection: 'users',
      data: {
        ...args.payload,
        userId: userId,
        created: new Date(),
        updated: new Date(),
        isActive: true

      }
    })
  }).then((data) => {
    return dataSources.mongoAPI.getItemData(
      { db: 'tasksDB', collection: 'users', query: { "userId": userId } }
    )
  })
  return getData.then(data => data).catch((err) => {
    console.log(err)
  })
});
router.post('/user/update', function(req, res){
  
});
router.post('/user/delete', function(req, res){
  
});
router.post('/user/undelete', function(req, res){
  
});


//export this router to use in our index.js
module.exports = router;