//server.js

var express = require('express');
var app = express();
var bodyParser = require('body-parser');


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

var router = express.Router();// get an instance of the express Router

app.get('/', function (req, res) {
    res.send('GET request to the homepage');
});

// Start server
var port = process.env.PORT || 80;
app.listen(port);
console.log('Magic happens on port ' + port); 