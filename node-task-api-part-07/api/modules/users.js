const express = require('express');
const router = express.Router();

const mongoAPI = require('./mongo');

router.get('/', (req, res) =>{
   const getData = new Promise((resolve) => {
      mongoAPI.getItems({ db: 'tasksDB', collection: 'users', query: {  } }
    ).then((data, err) => resolve(data))
    }).then((data) => {
      return res.json(data)
    })
    return getData.then(data => data).catch((err) => console.log(err))
});

router.get('/:user', (req, res)=> {
   const getData = new Promise((resolve) => {
      mongoAPI.getItem(
        { db: 'tasksDB', collection: 'users', query: { "userName": req.params.user } }
      ).then((data, err) => resolve(data))
    }).then((data) => {
      return res.json(data)

    })
    return getData.then(data => data).catch((err) => console.log(err))
});

router.post('/login', (req, res) =>{
  const getData = new Promise((resolve) => {
    console.log(req.body)
    mongoAPI.getItem(
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
    return res.json(data) 

  })
  return getData.then(data => data).catch((err) => console.log(err))
});


module.exports = router;