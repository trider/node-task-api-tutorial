const express = require('express');
const router = express.Router();
var MongoClient = require('mongodb').MongoClient;


router.get('/users', function(req, res){

   mongoApi.getItemData({db:"test",collection:"users",query:{}}).then(data => {
      res.send(data)
   })
});



//export this router to use in our index.js
module.exports = router;