var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
   res.send('GET route on things.');
});
router.post('/', function(req, res){
   res.send('POST route on things.');
});

app.get('/:id', function(req, res){
    res.send('The id you specified is ' + req.params.id);
 });

router.get('/:name/:id', function(req, res) {
    res.send('id: ' + req.params.id + ' and name: ' + req.params.name);
 });


//export this router to use in our index.js
module.exports = router;