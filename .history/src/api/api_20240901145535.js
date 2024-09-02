const express = require('express');
const router = express.Router();
const mongoApi = require('./mongo');

router.get('/users', function(req, res){
   mongoApi.getItemData({db:'test', collection:'test', query:{}}).then(data => {
      res.send(data);
   })
});



//export this router to use in our index.js
module.exports = router;