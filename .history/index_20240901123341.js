var express = require('express');
var app = express();

var things = require('./things.js');
app.use('/things', things);



app.listen(3000);