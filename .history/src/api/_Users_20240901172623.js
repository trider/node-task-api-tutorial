const express = require('express');
const router = express.Router();
const mongoAPI = require('./_mongo');

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











//export this router to use in our index.js
module.exports = router;