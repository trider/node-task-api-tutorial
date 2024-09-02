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




app.listen(3000);