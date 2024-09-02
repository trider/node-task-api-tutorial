var express = require('express');
var app = express();
var things = require('./things.js');
app.use('/things', things);

app.get('/', function(req, res){
   res.send("Hello world!");
});

app.get('/:id', function(req, res){
    res.send('The id you specified is ' + req.params.id);
 });

app.get('/hello', function(req, res){
   res.send("Hello World!");
});

app.post('/hello', function(req, res){
   res.send("You just called the post method at '/hello'!\n");
});

app.get('/things/:name/:id', function(req, res) {
    res.send('id: ' + req.params.id + ' and name: ' + req.params.name);
 });

 app.get('/things/:id([0-9]{5})', function(req, res){
    res.send('id: ' + req.params.id);
 });




app.listen(3000);