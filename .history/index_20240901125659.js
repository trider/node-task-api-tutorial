var express = require('express');
var app = express();
var things = require('./things.js');
// app.use('/things', function(req, res, next){
//     console.log("A request for things received at " + Date.now());
//     next();
//  });

 app.use(function(req, res, next){
    console.log("Start");
    next();
 });
 
 //Route handler
 app.get('/', function(req, res, next){
    res.send("Middle");
    next();
 });
 
 app.use('/', function(req, res){
    console.log('End');
 });





// app.get('/', function(req, res){
//    res.send("Hello world!");
// });



// app.get('/hello', function(req, res){
//    res.send("Hello World!");
// });

// app.post('/hello', function(req, res){
//    res.send("You just called the post method at '/hello'!\n");
// });

// app.get('/things/:name/:id', function(req, res) {
//     res.send('id: ' + req.params.id + ' and name: ' + req.params.name);
//  });

//  app.get('/things/:id([0-9]{5})', function(req, res){
//     res.send('id: ' + req.params.id);
//  });

//  app.get('*', function(req, res){
//     res.send('Sorry, this is an invalid URL.');
//  });




app.listen(3000);