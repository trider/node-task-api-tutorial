var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
   res.send('GET route on things.');
});

router.get('/hello', function(req, res){
   res.send('GET route on things.');
});

router.post('/hello', function(req, res){
   res.send('POST route on things.');
});

//export this router to use in our index.js
module.exports = router;