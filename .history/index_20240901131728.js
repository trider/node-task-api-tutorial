var express = require('express');
var app = express();
var things = require('./things.js');
app.use('/things', function(req, res, next){
    console.log("A request for things received at " + Date.now());
    next();
 });

 app.use('/static', express.static('public'));
 

app.set('view engine', 'pug');
app.set('views','./views');

 app.get('/first_template', function(req, res){
    res.render('first_view');
 });

 app.get('/dynamic_view', function(req, res){
    res.render('dynamic', {
        user: {name: "Ayush", age: "20"}
    //    name: "TutorialsPoint", 
    //    url:"http://www.tutorialspoint.com"
    });
 });



 app.get('/components', function(req, res){
    res.render('content');
});



app.get('/', function(req, res){
   res.send("Hello world!");
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

 app.get('*', function(req, res){
    res.send('Sorry, this is an invalid URL.');
 });




app.listen(3000);